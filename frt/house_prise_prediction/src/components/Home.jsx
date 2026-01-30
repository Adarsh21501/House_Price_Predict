import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen text-white">

      {/* HERO */}
      <section
        className="
          relative
          min-h-screen
          flex items-center justify-center
          px-4 sm:px-6
          bg-[url('https://images.unsplash.com/photo-1568605114967-8130f3a36994')]
          bg-cover
          bg-center
        "
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* BOTTOM GRADIENT (THIS FIXES THE DOWN SIDE) */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 to-transparent"></div>

        {/* CONTENT CARD */}
        <div
          className="
            relative z-10
            max-w-xl
            w-full
            bg-gray-900/80
            backdrop-blur
            rounded-2xl
            p-6 sm:p-8
            text-center
            mt-10
            mb-24
          "
        >
          <h1 className="
            text-2xl
            sm:text-3xl
            md:text-5xl
            font-bold
            leading-tight
            mb-4
          ">
            Smart House Price Prediction
          </h1>

          <p className="
            text-gray-300
            text-sm sm:text-base
            mb-6
          ">
            Enter property details and instantly get accurate house price
            predictions using machine learning.
          </p>

          <Link
            to="/predict"
            className="
              inline-block
              w-full sm:w-auto
              bg-blue-600 hover:bg-blue-700
              px-6 py-3
              rounded-xl
              text-base
              font-semibold
              transition
            "
          >
            Predict Price →
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-900 px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <Feature icon="📊" title="ML Powered" desc="Trained on real housing data with professional preprocessing." />
          <Feature icon="⚡" title="Instant Results" desc="Fast predictions using a deployed machine learning model." />
          <Feature icon="🌐" title="Modern Web App" desc="Built with React, Tailwind CSS, and Flask backend." />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-center text-gray-500 text-sm py-6">
        © 2026 HouseML — Built with ❤️ & ML
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

export default Home;
