import { useLocation, useNavigate } from "react-router-dom";

function Prise() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        No prediction data found.
      </div>
    );
  }

  const { price, features, model } = state;

  // ✅ SAVE TO LOCAL STORAGE
  const saveResult = () => {
    const existing = JSON.parse(localStorage.getItem("predictions")) || [];

    const newEntry = {
      id: Date.now(),
      price,
      features,
      model,
      time: new Date().toLocaleString()
    };

    localStorage.setItem(
      "predictions",
      JSON.stringify([newEntry, ...existing])
    );

    navigate("/recents");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center mb-6">
          📊 Prediction Result
        </h2>

        <div className="bg-green-600/20 border border-green-500 text-green-300 p-6 rounded-xl text-center text-2xl font-bold mb-6">
          💰 Estimated Price: ${price}
        </div>

        <br></br>

        {/* FEATURES TABLE */}
        <table className="w-full border border-gray-700 rounded-xl mb-8">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">Feature</th>
              <th className="p-3 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(features).map(([key, value]) => (
              <tr key={key} className="border-t border-gray-700">
                <td className="p-3 capitalize">
                  {key.replaceAll("_", " ")}
                </td>
                <td className="p-3">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ACTION BUTTONS */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/predict")}
            className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold"
          >
            🔄 Predict Another
          </button>

          <button
            onClick={saveResult}
            className="bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold"
          >
            💾 Save Result
          </button>

          <button
            onClick={() => navigate("/recents")}
            className="bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold"
          >
            📜 View Recents
          </button>
        </div>
      </div>
    </div>
  );
}

export default Prise;
