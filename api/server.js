import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // clé "service_role" à usage serveur
);

// route d'accueil
app.get('/', (_, res) => res.send('Shadowverse Tracker API v0.1'));

// enregistrer un match
app.post('/api/match', async (req, res) => {
  const { deck, opponent, result } = req.body;
  const { error } = await supabase.from('matches').insert([{ deck, opponent, result }]);
  if (error) return res.status(400).json({ error });
  res.json({ status: 'ok' });
});

// liste des matchs
app.get('/api/matches', async (_, res) => {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error });
  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ API running on http://localhost:${port}`));
