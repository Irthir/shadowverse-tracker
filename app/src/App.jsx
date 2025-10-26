// shadowverse-tracker/app/src/App.jsx
import { useState } from "react";

const API_BASE = "https://shadowverse-tracker.onrender.com/api";

function App() {
  const [deck1, setDeck1] = useState("");
  const [deck2, setDeck2] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!deck1 || !deck2 || !result) {
      alert("Merci de remplir tous les champs !");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deck_1: deck1,
          deck_2: deck2,
          result:
            result === "Win"
              ? "deck_1_win"
              : result === "Loss"
              ? "deck_2_win"
              : "draw",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Erreur API : " + (err.error || res.statusText));
      } else {
        alert("Match enregistré !");
        setDeck1("");
        setDeck2("");
        setResult("");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau ou API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 400,
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Shadowverse Tracker</h2>
      <label style={{ display: "block", marginBottom: 4 }}>Mon deck</label>
      <input
        placeholder="Ex: Abyssal"
        value={deck1}
        onChange={(e) => setDeck1(e.target.value)}
        style={{ display: "block", marginBottom: 8, width: "100%" }}
      />

      <label style={{ display: "block", marginBottom: 4 }}>Deck adverse</label>
      <input
        placeholder="Ex: Royal"
        value={deck2}
        onChange={(e) => setDeck2(e.target.value)}
        style={{ display: "block", marginBottom: 8, width: "100%" }}
      />

      <label style={{ display: "block", marginBottom: 4 }}>Résultat</label>
      <select
        value={result}
        onChange={(e) => setResult(e.target.value)}
        style={{ display: "block", marginBottom: 8, width: "100%" }}
      >
        <option value="">Résultat</option>
        <option value="Win">Victoire</option>
        <option value="Loss">Défaite</option>
        <option value="Draw">Égalité</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          padding: "8px 12px",
          backgroundColor: "#0066ff",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {loading ? "Enregistrement..." : "Enregistrer"}
      </button>
    </div>
  );
}

export default App;
