import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatches() {
      setLoading(true);
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Erreur Supabase:", error);
      else setMatches(data || []);
      setLoading(false);
    }

    loadMatches();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Historique des matchs</h2>

      {loading && <p>Chargement...</p>}

      {!loading && (
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Deck</th>
              <th>Adversaire</th>
              <th>Résultat</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m, i) => (
              <tr key={i}>
                <td>{m.deck}</td>
                <td>{m.opponent}</td>
                <td
                  style={{
                    color: m.result === "Win" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {m.result}
                </td>
                <td>{new Date(m.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
