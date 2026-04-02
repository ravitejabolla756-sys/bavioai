const INTERNAL_SAMPLE_RATE = 16000;
const INTERNAL_CODEC = 'pcm_s16le';

function clampSample(sample) {
    return Math.max(-32768, Math.min(32767, sample));
}

function decodePcm16(buffer) {
    const samples = new Int16Array(buffer.length / 2);

    for (let index = 0; index < samples.length; index += 1) {
        samples[index] = buffer.readInt16LE(index * 2);
    }

    return samples;
}

function encodePcm16(samples) {
    const buffer = Buffer.alloc(samples.length * 2);

    for (let index = 0; index < samples.length; index += 1) {
        buffer.writeInt16LE(clampSample(samples[index]), index * 2);
    }

    return buffer;
}

function decodeMuLawSample(value) {
    const MULAW_BIAS = 33;
    let byte = ~value & 0xff;
    const sign = byte & 0x80;
    const exponent = (byte >> 4) & 0x07;
    const mantissa = byte & 0x0f;
    let sample = ((mantissa << 4) + 0x08) << exponent;
    sample -= MULAW_BIAS;
    return sign ? -sample : sample;
}

function encodeMuLawSample(sample) {
    const MULAW_MAX = 0x1fff;
    const MULAW_BIAS = 33;
    let pcm = clampSample(sample);
    let sign = 0;

    if (pcm < 0) {
        sign = 0x80;
        pcm = -pcm;
    }

    pcm = Math.min(pcm, MULAW_MAX);
    pcm += MULAW_BIAS;

    let exponent = 7;
    for (let mask = 0x4000; (pcm & mask) === 0 && exponent > 0; mask >>= 1) {
        exponent -= 1;
    }

    const mantissa = (pcm >> (exponent + 3)) & 0x0f;
    const muLaw = ~(sign | (exponent << 4) | mantissa);
    return muLaw & 0xff;
}

function decodeMuLaw(buffer) {
    const samples = new Int16Array(buffer.length);

    for (let index = 0; index < buffer.length; index += 1) {
        samples[index] = decodeMuLawSample(buffer[index]);
    }

    return encodePcm16(samples);
}

function encodeMuLaw(buffer) {
    const samples = decodePcm16(buffer);
    const output = Buffer.alloc(samples.length);

    for (let index = 0; index < samples.length; index += 1) {
        output[index] = encodeMuLawSample(samples[index]);
    }

    return output;
}

function resamplePcm16(buffer, inputRate, outputRate) {
    if (inputRate === outputRate) {
        return buffer;
    }

    const inputSamples = decodePcm16(buffer);
    const outputLength = Math.max(1, Math.round(inputSamples.length * outputRate / inputRate));
    const outputSamples = new Int16Array(outputLength);

    for (let index = 0; index < outputLength; index += 1) {
        const position = (index * (inputSamples.length - 1)) / Math.max(outputLength - 1, 1);
        const leftIndex = Math.floor(position);
        const rightIndex = Math.min(leftIndex + 1, inputSamples.length - 1);
        const interpolation = position - leftIndex;
        outputSamples[index] = Math.round(
            inputSamples[leftIndex] * (1 - interpolation) + inputSamples[rightIndex] * interpolation
        );
    }

    return encodePcm16(outputSamples);
}

function normalizeInputAudio({ audioBase64, codec, sampleRate }) {
    let rawAudio = Buffer.from(audioBase64, 'base64');
    let pcmAudio;

    switch ((codec || '').toLowerCase()) {
        case 'mulaw':
        case 'mu-law':
        case 'audio/x-mulaw':
            pcmAudio = decodeMuLaw(rawAudio);
            break;
        case 'pcm':
        case 'linear16':
        case 'pcm_s16le':
        case 'audio/l16':
            pcmAudio = rawAudio;
            break;
        default:
            throw new Error(`Unsupported input codec: ${codec}`);
    }

    const normalized = resamplePcm16(pcmAudio, sampleRate || INTERNAL_SAMPLE_RATE, INTERNAL_SAMPLE_RATE);

    return {
        codec: INTERNAL_CODEC,
        sampleRate: INTERNAL_SAMPLE_RATE,
        pcmBuffer: normalized,
        audioBase64: normalized.toString('base64'),
    };
}

function convertOutputAudio({ audioBase64, codec, sampleRate, targetCodec, targetSampleRate }) {
    let buffer = Buffer.from(audioBase64, 'base64');
    let pcmAudio;

    switch ((codec || '').toLowerCase()) {
        case 'pcm':
        case 'linear16':
        case 'pcm_s16le':
        case 'audio/l16':
            pcmAudio = buffer;
            break;
        case 'mulaw':
        case 'mu-law':
            pcmAudio = decodeMuLaw(buffer);
            break;
        default:
            throw new Error(`Unsupported output codec: ${codec}`);
    }

    const resampled = resamplePcm16(pcmAudio, sampleRate || INTERNAL_SAMPLE_RATE, targetSampleRate);

    switch ((targetCodec || '').toLowerCase()) {
        case 'pcm':
        case 'linear16':
        case 'pcm_s16le':
            return {
                codec: 'pcm_s16le',
                sampleRate: targetSampleRate,
                buffer: resampled,
                audioBase64: resampled.toString('base64'),
            };
        case 'mulaw':
        case 'mu-law':
            {
                const muLaw = encodeMuLaw(resampled);
                return {
                    codec: 'mulaw',
                    sampleRate: targetSampleRate,
                    buffer: muLaw,
                    audioBase64: muLaw.toString('base64'),
                };
            }
        default:
            throw new Error(`Unsupported target codec: ${targetCodec}`);
    }
}

function detectVoiceActivity(pcmBuffer, threshold = 900) {
    const samples = decodePcm16(pcmBuffer);
    if (!samples.length) return false;

    let total = 0;
    for (const sample of samples) {
        total += sample * sample;
    }

    const rms = Math.sqrt(total / samples.length);
    return rms >= threshold;
}

function wrapPcmAsWav(buffer, sampleRate, channels = 1, bitsPerSample = 16) {
    const byteRate = sampleRate * channels * (bitsPerSample / 8);
    const blockAlign = channels * (bitsPerSample / 8);
    const header = Buffer.alloc(44);

    header.write('RIFF', 0);
    header.writeUInt32LE(36 + buffer.length, 4);
    header.write('WAVE', 8);
    header.write('fmt ', 12);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20);
    header.writeUInt16LE(channels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(byteRate, 28);
    header.writeUInt16LE(blockAlign, 32);
    header.writeUInt16LE(bitsPerSample, 34);
    header.write('data', 36);
    header.writeUInt32LE(buffer.length, 40);

    return Buffer.concat([header, buffer]);
}

module.exports = {
    INTERNAL_CODEC,
    INTERNAL_SAMPLE_RATE,
    convertOutputAudio,
    detectVoiceActivity,
    normalizeInputAudio,
    resamplePcm16,
    wrapPcmAsWav,
};
