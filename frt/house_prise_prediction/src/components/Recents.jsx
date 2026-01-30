import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Recents() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("predictions")) || [];
    setData(saved);
  }, []);

  // ❌ DELETE SINGLE RECORD
  const deletePrediction = (id) => {
    const updated = data.filter(item => item.id !== id);
    setData(updated);
    localStorage.setItem("predictions", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center mb-8">
          📜 Recent Predictions
        </h2>

        {data.length === 0 ? (
          <p className="text-center text-gray-400">
            No saved predictions yet.
          </p>
        ) : (
          <div className="space-y-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="relative border border-gray-700 rounded-xl p-6"
              >

        <button
           onClick={() => navigate('/edit', { state: { item } })}
            title="Edit"
             className="absolute right-20 top-1/2 -translate-y-1/2 text-yellow-400 text-sm font-medium px-2 py-1 rounded hover:bg-yellow-600/20 hover:text-yellow-300 transition-all duration-200"
        >
             Edit
        </button>
        <button
            onClick={() => deletePrediction(item.id)}
            title="Delete"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 text-sm font-medium px-2 py-1 rounded hover:bg-red-600/20 hover:text-red-600 transition-all duration-200"
        >
         Delete
        </button>





                <div className="flex justify-between mb-3 pr-10">
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

                <details className="cursor-pointer">
                  <summary className="text-blue-400">
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
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold"
        >
          🔙 Back to Predict
        </button>
      </div>
    </div>
  );
}

export default Recents;
