async function retry(fn, options = {}) {
    const retries = options.retries ?? 3;
    const baseDelayMs = options.baseDelayMs ?? 150;
    const label = options.label || 'operation';

    let lastError;

    for (let attempt = 1; attempt <= retries; attempt += 1) {
        try {
            return await fn(attempt);
        } catch (error) {
            lastError = error;

            if (attempt >= retries) {
                break;
            }

            const delayMs = baseDelayMs * (2 ** (attempt - 1));
            console.warn(`[retry] ${label} failed on attempt ${attempt}: ${error.message}`);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }

    throw lastError;
}

module.exports = { retry };
