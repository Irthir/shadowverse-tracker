import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // clé service_role, usage serveur uniquement
);

// ------------------------------------------------------------
// Route d'accueil
// ------------------------------------------------------------
app.get("/", (_, res) => res.send("Shadowverse Tracker API v1.0 🚀"));

// ------------------------------------------------------------
// POST /api/match  → ajouter une partie
// ------------------------------------------------------------
app.post("/api/match", async (req, res) => {
  try {
    const { deck_1, deck_2, result, notes } = req.body;

    // Validation basique
    const validDecks = [
      "Abyssal",
      "Sylvestre",
      "Royal",
      "Ecclésiastique",
      "Esotérique",
      "Draconique",
      "Dimensionnel",
    ];
    const validResults = ["deck_1_win", "deck_2_win", "draw"];

    if (!validDecks.includes(deck_1) || !validDecks.includes(deck_2))
      return res.status(400).json({ error: "Decks invalides." });

    if (!validResults.includes(result))
      return res.status(400).json({ error: "Résultat invalide." });

    const { error } = await supabase.from("matches").insert([
      {
        deck_1,
        deck_2,
        result,
        notes: notes || null,
        played_at: new Date().toISOString(),
      },
    ]);

    if (error) throw error;
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// ------------------------------------------------------------
// GET /api/matches → liste complète des matchs
// ------------------------------------------------------------
app.get("/api/matches", async (_, res) => {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("played_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de récupération des données." });
  }
});

// ------------------------------------------------------------
// GET /api/stats → taux de victoire par matchup (vue SQL)
// ------------------------------------------------------------
app.get("/api/stats", async (_, res) => {
  try {
    const { data, error } = await supabase.from("matchups_stats").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de récupération des statistiques." });
  }
});

// ------------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`✅ Shadowverse API en ligne : http://localhost:${port}`)
);
