import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Recents() {
  const [data, setData] = useState([]);
  const [sortMode, setSortMode] = useState("normal"); 
  // normal | high | low
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("predictions")) || [];
    setData(saved);
  }, []);

  // ❌ DELETE SINGLE
  const deletePrediction = (id) => {
    const updated = data.filter(item => item.id !== id);
    setData(updated);
    localStorage.setItem("predictions", JSON.stringify(updated));
  };

  // 🧹 CLEAR ALL
  const clearAll = () => {
    localStorage.removeItem("predictions");
    setData([]);
  };

  // 🔽 SORT DATA
  const sortedData = [...data].sort((a, b) => {
    if (sortMode === "high") return b.price - a.price; // High → Low
    if (sortMode === "low") return a.price - b.price;  // Low → High
    return b.id - a.id; // Normal (latest first)
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">

        <h2 className="text-3xl font-bold text-center mb-6">
          📜 Recent Predictions
        </h2>

        {/* SORT / DEFAULT / CLEAR — RESPONSIVE */}
        {data.length > 0 && (
          <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:justify-center sm:gap-6">

            {/* TOGGLE HIGH / LOW */}
            <button
              onClick={() =>
                setSortMode(sortMode === "high" ? "low" : "high")
              }
              className="
                w-full sm:w-48
                border border-gray-500
                rounded-md
                py-2
                text-sm font-medium
                bg-gray-700
                hover:bg-gray-600
                transition
              "
            >
              {sortMode === "high" ? "Low → High" : "High → Low"}
            </button>

            {/* DEFAULT */}
            <button
              onClick={() => setSortMode("normal")}
              className={`
                w-full sm:w-48
                border border-green-500
                rounded-md
                py-2
                text-sm font-medium
                transition
                ${
                  sortMode === "normal"
                    ? "bg-blue-600 text-white"
                    : "bg-green-700 hover:bg-gray-600"
                }
              `}
            >
              Default
            </button>

            {/* CLEAR ALL */}
            <button
              onClick={clearAll}
              className="
                w-full sm:w-48
                bg-red-600 hover:bg-red-700
                py-2
                rounded-md
                text-sm font-medium
                transition
              "
            >
              Clear All
            </button>

          </div>
        )}

        {/* LIST */}
        {sortedData.length === 0 ? (
          <p className="text-center text-gray-400">
            No saved predictions yet.
          </p>
        ) : (
          <div className="space-y-6">
            {sortedData.map((item) => (
              <div
                key={item.id}
                className="relative border border-gray-700 rounded-xl p-6"
              >

                {/* EDIT */}
                <button
                  onClick={() => navigate("/edit", { state: { item } })}
                  className="
                    absolute right-20 top-4 sm:top-1/2 sm:-translate-y-1/2
                    text-yellow-400 text-sm
                    px-2 py-1 rounded
                    hover:bg-yellow-600/20 hover:text-yellow-300
                    transition
                  "
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deletePrediction(item.id)}
                  className="
                    absolute right-4 top-4 sm:top-1/2 sm:-translate-y-1/2
                    text-red-400 text-sm
                    px-2 py-1 rounded
                    hover:bg-red-600/20 hover:text-red-600
                    transition
                  "
                >
                  Delete
                </button>

                <div className="flex flex-col sm:flex-row sm:justify-between mb-3 pr-28 gap-1">
                  <span className="text-green-400 font-bold text-lg">
                    💰 ${item.price}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {item.time}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-2">
                  Model: {item.model}
                </p>

                <details>
                  <summary className="text-blue-400 cursor-pointer">
                    View Features
                  </summary>
                  <ul className="mt-2 text-sm text-gray-300 space-y-1">
                    {Object.entries(item.features).map(([k, v]) => (
                      <li key={k}>
                        {k.replaceAll("_", " ")}: {v}
                      </li>
                    ))}
                  </ul>
                </details>

              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate("/predict")}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
        >
          🔙 Back to Predict
        </button>

      </div>
    </div>
  );
}

export default Recents;
