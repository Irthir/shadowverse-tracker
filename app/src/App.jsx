// shadowverse-tracker/app/src/App.jsx
import { useState } from "react";

// Import des images de decks
import ecclesiastique from "./assets/ecclesiastique.png";
import abyssal from "./assets/abyssal.png";
import sylvestre from "./assets/sylvestre.png";
import royal from "./assets/royal.png";
import draconique from "./assets/draconique.png";
import esoterique from "./assets/esoterique.png";
import dimensionnel from "./assets/dimensionnel.png";

// Import des icônes de résultat
import winIcon from "./assets/win.png";
import lossIcon from "./assets/loss.png";
import drawIcon from "./assets/draw.png";

const API_BASE = "https://shadowverse-tracker.onrender.com/api";

const decks = [
  { name: "Ecclésiastique", img: ecclesiastique },
  { name: "Abyssal", img: abyssal },
  { name: "Sylvestre", img: sylvestre },
  { name: "Royal", img: royal },
  { name: "Draconique", img: draconique },
  { name: "Esotérique", img: esoterique },
  { name: "Dimensionnel", img: dimensionnel },
];

const results = [
  { value: "Win", label: "Victoire J1", img: winIcon },
  { value: "Loss", label: "Victoire J2", img: lossIcon },
  { value: "Draw", label: "Égalité", img: drawIcon },
];

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

  const renderDeckOptions = (selectedDeck, setDeck) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
        marginBottom: 16,
      }}
    >
      {decks.map((deck) => (
        <label
          key={deck.name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            border:
              selectedDeck === deck.name
                ? "3px solid #00a2ff"
                : "2px solid transparent",
            borderRadius: 10,
            padding: 6,
            transition: "all 0.2s ease",
            boxShadow:
              selectedDeck === deck.name
                ? "0 0 10px rgba(0,162,255,0.8)"
                : "0 0 4px rgba(0,0,0,0.1)",
            transform: selectedDeck === deck.name ? "scale(1.1)" : "scale(1)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform =
              selectedDeck === deck.name ? "scale(1.1)" : "scale(1)")
          }
        >
          <img
            src={deck.img}
            alt={deck.name}
            width={70}
            height={70}
            style={{ borderRadius: 8 }}
          />
          <input
            type="radio"
            name={setDeck.name}
            value={deck.name}
            checked={selectedDeck === deck.name}
            onChange={() => setDeck(deck.name)}
            style={{ display: "none" }}
          />
          <span style={{ fontSize: 12, marginTop: 4 }}>{deck.name}</span>
        </label>
      ))}
    </div>
  );

  const renderResultOptions = () => (
    <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 16 }}>
      {results.map((r) => (
        <label
          key={r.value}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            border:
              result === r.value
                ? "3px solid #00a2ff"
                : "2px solid transparent",
            borderRadius: 10,
            padding: 6,
            transition: "all 0.2s ease",
            boxShadow:
              result === r.value
                ? "0 0 10px rgba(0,162,255,0.8)"
                : "0 0 4px rgba(0,0,0,0.1)",
            transform: result === r.value ? "scale(1.1)" : "scale(1)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform =
              result === r.value ? "scale(1.1)" : "scale(1)")
          }
        >
          <img src={r.img} alt={r.label} width={60} height={60} />
          <input
            type="radio"
            name="result"
            value={r.value}
            checked={result === r.value}
            onChange={() => setResult(r.value)}
            style={{ display: "none" }}
          />
          <span style={{ fontSize: 12, marginTop: 4 }}>{r.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 700,
        margin: "0 auto",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: 20, color: "#dadadaff" }}>Shadowverse Tracker</h2>

      <div>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
          Mon deck
        </label>
        {renderDeckOptions(deck1, setDeck1)}

        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
          Deck adverse
        </label>
        {renderDeckOptions(deck2, setDeck2)}

        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
          Résultat
        </label>
        {renderResultOptions()}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px 16px",
          backgroundColor: loading ? "#888" : "#0066ff",
          color: "white",
          fontSize: 16,
          fontWeight: 600,
          border: "none",
          borderRadius: 8,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background-color 0.2s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.backgroundColor = "#0050cc";
        }}
        onMouseLeave={(e) => {
          if (!loading) e.currentTarget.style.backgroundColor = "#0066ff";
        }}
      >
        {loading ? "Enregistrement..." : "Enregistrer"}
      </button>
    </div>
  );
}

export default App;
