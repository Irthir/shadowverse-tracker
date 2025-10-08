// shadowverse-tracker/app/src/App.jsx
import { useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [deck, setDeck] = useState("");
  const [opponent, setOpponent] = useState("");
  const [result, setResult] = useState("");

  async function handleSubmit() {
    const { error } = await supabase.from("matches").insert([
      { deck, opponent, result }
    ]);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      alert("Match enregistré !");
      setDeck("");
      setOpponent("");
      setResult("");
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h2>Shadowverse Tracker</h2>
      <input
        placeholder="Mon deck"
        value={deck}
        onChange={(e) => setDeck(e.target.value)}
        style={{ display: "block", marginBottom: 8 }}
      />
      <input
        placeholder="Deck adverse"
        value={opponent}
        onChange={(e) => setOpponent(e.target.value)}
        style={{ display: "block", marginBottom: 8 }}
      />
      <select
        value={result}
        onChange={(e) => setResult(e.target.value)}
        style={{ display: "block", marginBottom: 8 }}
      >
        <option value="">Résultat</option>
        <option value="Win">Win</option>
        <option value="Loss">Loss</option>
      </select>
      <button onClick={handleSubmit}>Enregistrer</button>
    </div>
  );
}

export default App;
