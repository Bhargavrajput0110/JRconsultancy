import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
// const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.json({ message: 'Express server running and ready for Supabase!' });
});

// Example route using Supabase (Requires valid env variables)
// app.get('/api/data', async (req, res) => {
//   const { data, error } = await supabase.from('your_table').select('*');
//   if (error) return res.status(500).json({ error: error.message });
//   res.json(data);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
