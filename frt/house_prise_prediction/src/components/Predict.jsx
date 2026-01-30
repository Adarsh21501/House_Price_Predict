import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Predict() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bedrooms: "",
    bathrooms: "",
    sqft_living: "",
    sqft_lot: "",
    floors: "",
    condition: "",
    grade: "",
    sqft_above: "",
    yr_built: "",
    sqft_living15: "",
    sqft_lot15: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value)
    });
  };

  // Validation: all fields required
  const isFormValid = () => {
    return Object.values(form).every(
      (value) => value !== "" && !isNaN(value)
    );
  };

  const predictPrice = async () => {
    setError(null);

    // ❌ Stop if form invalid
    if (!isFormValid()) {
      setError("⚠️ Please fill in all fields before predicting.");
      return;
    }

    setLoading(true);

    try {
      // 🔗 Call backend
      const response = await axios.post(
        "http://127.0.0.1:5001/predict",
        form
      );

      const price = response.data.predicted_price;

      // 💾 SAVE TO RECENTS (localStorage)
      const existing = JSON.parse(localStorage.getItem("predictions")) || [];

      const newEntry = {
        id: Date.now(),
        price,
        features: form,
        model: "Linear Regression (Best Model)",
        time: new Date().toLocaleString()
      };

      localStorage.setItem(
        "predictions",
        JSON.stringify([newEntry, ...existing])
      );

      // ➡️ GO TO RESULT PAGE
      navigate("/result", {
        state: {
          price,
          features: form,
          model: "Linear Regression (Best Model)"
        }
      });

    } catch (err) {
      setError("Prediction failed. Please check backend.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center py-16 px-4">
      <div className="max-w-4xl w-full bg-gray-800 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-6 text-center">
          🏠 House Price Prediction
        </h2>

        {/* INPUT FORM */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Bedrooms" name="bedrooms" placeholder="3" onChange={handleChange} />
          <Input label="Bathrooms" name="bathrooms" placeholder="2" onChange={handleChange} />
          <Input label="Living Area (sqft)" name="sqft_living" placeholder="1800" onChange={handleChange} />
          <Input label="Lot Size (sqft)" name="sqft_lot" placeholder="5000" onChange={handleChange} />
          <Input label="Floors" name="floors" placeholder="2" onChange={handleChange} />
          <Input label="Condition (1–7)" name="condition" placeholder="3" onChange={handleChange} />
          <Input label="Grade (1–7)" name="grade" placeholder="7" onChange={handleChange} />
          <Input label="Above Ground sqft" name="sqft_above" placeholder="1800" onChange={handleChange} />
          <Input label="Year Built" name="yr_built" placeholder="2010" onChange={handleChange} />
          <Input label="Avg Living sqft (15)" name="sqft_living15" placeholder="1700" onChange={handleChange} />
          <Input label="Avg Lot sqft (15)" name="sqft_lot15" placeholder="4800" onChange={handleChange} />
        </div>

        {/* BUTTON */}
        <button
          onClick={predictPrice}
          disabled={loading}
          className={`w-full mt-8 py-3 rounded-xl text-lg font-semibold transition
            ${loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Predicting..." : "Predict Price"}
        </button>

        {/* ERROR */}
        {error && (
          <div className="mt-6 bg-red-600/20 border border-red-500 text-red-300 p-4 rounded-xl text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

// 🔁 Reusable Input Component
function Input({ label, name, placeholder, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm text-gray-300">{label}</label>
      <input
        type="number"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default Predict;
