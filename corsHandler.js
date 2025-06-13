// server.js or deleteHandler.js
import 'dotenv/config'; // Or: require('dotenv').config(); if using CommonJS
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

// console.log('Supabase URL:', process.env.SUPABASE_URL);
// console.log('Service Role Key:', process.env.SUPABASE_SERVICE_ROLE_KEY);


// Set up environment variables (use .env file or process.env)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const app = express();

app.use(cors());
app.use(express.json());

app.post('/delete-url', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing id in request body' });
  }

  try {
    const { data, error } = await supabase
      .from('urls')
      .delete()
      .eq('user-id', id); // or .eq('id', id) depending on schema

    if (error) {
      return res.status(500).json("supabase error: ",{ error: error.message });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
