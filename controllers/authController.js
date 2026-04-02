const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const supabase = require('../database/db');

const SALT_ROUNDS = 12;

function signToken(business) {
    return jwt.sign(
        { id: business.id, email: business.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

async function signup(req, res) {
    try {
        const { name, email, phone, password } = req.body || {};

        const normalizedName = typeof name === 'string' ? name.trim() : '';
        const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
        const normalizedPhone = typeof phone === 'string' ? phone.trim() : '';
        const normalizedPassword = typeof password === 'string' ? password : '';

        if (!normalizedName || !normalizedEmail || !normalizedPhone || !normalizedPassword) {
            return res.status(400).json({ success: false, error: 'Missing fields' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({ success: false, error: 'Invalid email format.' });
        }

        if (normalizedPassword.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 6 characters long.',
            });
        }

        const { data: existingEmail, error: emailLookupError } = await supabase
            .from('businesses')
            .select('id')
            .eq('email', normalizedEmail)
            .maybeSingle();

        if (emailLookupError) {
            console.error('SIGNUP ERROR:', emailLookupError);
            return res.status(500).json({ success: false, error: emailLookupError.message });
        }

        if (existingEmail) {
            return res.status(409).json({ success: false, error: 'Email already exists' });
        }

        const { data: existingPhone, error: phoneLookupError } = await supabase
            .from('businesses')
            .select('id')
            .eq('phone', normalizedPhone)
            .maybeSingle();

        if (phoneLookupError) {
            console.error('SIGNUP ERROR:', phoneLookupError);
            return res.status(500).json({ success: false, error: phoneLookupError.message });
        }

        if (existingPhone) {
            return res.status(409).json({ success: false, error: 'Phone already exists' });
        }

        const password_hash = await bcrypt.hash(normalizedPassword, SALT_ROUNDS);

        const { data, error } = await supabase
            .from('businesses')
            .insert([{
                name: normalizedName,
                email: normalizedEmail,
                phone: normalizedPhone,
                password_hash,
                plan: 'free',
                status: 'active',
            }])
            .select('id, name, email, phone, plan, status, created_at, updated_at')
            .single();

        if (error) {
            console.error('SIGNUP ERROR:', error);
            if (error.code === '23505' || error.status === 409) {
                if ((error.message || '').toLowerCase().includes('email')) {
                    return res.status(409).json({ success: false, error: 'Email already exists' });
                }

                if ((error.message || '').toLowerCase().includes('phone')) {
                    return res.status(409).json({ success: false, error: 'Phone already exists' });
                }
            }

            return res.status(500).json({ success: false, error: error.message });
        }

        return res.status(201).json({
            success: true,
            message: 'Signup successful',
            user: data,
        });
    } catch (err) {
        console.error('SIGNUP ERROR:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body || {};
        const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
        const normalizedPassword = typeof password === 'string' ? password : '';

        if (!normalizedEmail || !normalizedPassword) {
            return res.status(400).json({ success: false, error: 'Missing fields' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({ success: false, error: 'Invalid email format.' });
        }

        const { data: business, error } = await supabase
            .from('businesses')
            .select('id, name, email, phone, plan, status, password_hash')
            .eq('email', normalizedEmail)
            .maybeSingle();

        if (error) {
            console.error('LOGIN ERROR:', error);
            return res.status(500).json({ success: false, error: error.message });
        }

        if (!business) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        const passwordMatches = await bcrypt.compare(normalizedPassword, business.password_hash);

        if (!passwordMatches) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        const token = signToken(business);
        const { password_hash, ...safeUser } = business;

        return res.status(200).json({
            success: true,
            token,
            user: safeUser,
        });
    } catch (err) {
        console.error('LOGIN ERROR:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}

async function me(req, res) {
    try {
        const { data: business, error } = await supabase
            .from('businesses')
            .select('id, name, email, phone, plan, status, created_at, updated_at')
            .eq('id', req.user.id)
            .maybeSingle();

        if (error) {
            console.error('ME ERROR:', error);
            return res.status(500).json({ success: false, error: error.message });
        }

        if (!business) {
            return res.status(404).json({ success: false, error: 'Business not found' });
        }

        return res.status(200).json({
            success: true,
            user: business,
        });
    } catch (err) {
        console.error('ME ERROR:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = { signup, login, me };
