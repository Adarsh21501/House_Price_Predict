import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function EditPrediction() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.item) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        No data to edit
      </div>
    );
  }

  const original = state.item;

  // ✅ Keep as STRING while typing
  const [form, setForm] = useState(
    Object.fromEntries(
      Object.entries(original.features).map(([k, v]) => [k, String(v)])
    )
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ DO NOT convert to number here
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ SAVE + RE-PREDICT
  const saveEdit = async () => {
    setError(null);
    setLoading(true);

    try {
      // 🔢 Convert to numbers
      const numericFeatures = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, Number(v)])
      );

      // 🔁 CALL ML MODEL AGAIN
      const response = await axios.post(
        "https://house-price-predict-jjct.onrender.com/predict",
        numericFeatures
      );

      const newPrice = response.data.predicted_price;

      // 💾 UPDATE LOCAL STORAGE
      const stored = JSON.parse(localStorage.getItem("predictions")) || [];

      const updated = stored.map(item =>
        item.id === original.id
          ? {
              ...item,
              features: numericFeatures,
              price: newPrice,
              time: new Date().toLocaleString()
            }
          : item
      );

      localStorage.setItem("predictions", JSON.stringify(updated));

      navigate("/recents");

    } catch {
      setError("Failed to update prediction. Check backend.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-xl">

        <h2 className="text-3xl font-bold text-center mb-6">
          ✏️ Edit Prediction
        </h2>

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-6">
          {Object.keys(form).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm text-gray-300 capitalize">
                {key.replaceAll("_", " ")}
              </label>
              <input
                type="number"
                inputMode="numeric"
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-6 bg-red-600/20 border border-red-500 text-red-300 p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* BUTTONS */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <button
            onClick={() => navigate("/recents")}
            className="bg-gray-600 hover:bg-gray-700 py-3 rounded-xl font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={saveEdit}
            disabled={loading}
            className={`py-3 rounded-xl font-semibold transition
              ${loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Updating..." : "💾 Save & Recalculate"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditPrediction;
