require('dotenv').config();

const supabase = require('../database/db');
const bcrypt = require('bcrypt');

async function test() {
    console.log('Testing direct Supabase insert into businesses...');

    // 1. Try a simple select first
    const { data: selectData, error: selectError } = await supabase
        .from('businesses')
        .select('id, email')
        .limit(1);
    
    if (selectError) {
        console.error('SELECT error:', JSON.stringify(selectError, null, 2));
    } else {
        console.log('SELECT success, rows returned:', selectData.length);
    }

    // 2. Try an insert
    const password_hash = await bcrypt.hash('password123', 10);
    const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert([{
            name: 'Test Business',
            email: 'debugtest_' + Date.now() + '@example.com',
            phone: '99' + Date.now(),
            password_hash,
            plan: 'free',
            status: 'active',
        }])
        .select()
        .single();

    if (insertError) {
        console.error('INSERT error full:', JSON.stringify(insertError, null, 2));
    } else {
        console.log('INSERT success! Business ID:', insertData.id);
    }
}

test().catch(err => console.error('Unhandled:', err));
