import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Smart House Price Prediction
        </h1>

        <p className="text-gray-300 max-w-2xl text-lg mb-8">
          Predict house prices using machine learning. 
          Enter property details and get instant price estimates.
        </p>

        <Link
          to="/predict"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full text-lg font-semibold transition"
        >
          Get Started →
        </Link>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid gap-8 md:grid-cols-3">
        
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">📊 ML Powered</h3>
          <p className="text-gray-400">
            Trained on real housing data with professional preprocessing.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">⚡ Fast Prediction</h3>
          <p className="text-gray-400">
            Get instant price estimates using a deployed ML model.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">🌐 Web App</h3>
          <p className="text-gray-400">
            Built with React, Tailwind CSS, and Flask backend.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 pb-6">
        © 2026 HouseML — Built with ❤️ & ML
      </footer>
    </div>
  );
}

export default Home;
