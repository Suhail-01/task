import React, { useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Leaderboard from "./components/Leaderboard";
import Members from "./components/Members";
import Footer from "./components/Footer";
import Ribbons from "./components/Ribbons";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Ribbons
        colors={["#FFD700", "#7c3aed"]}
        baseThickness={18}
        speedMultiplier={0.5}
        maxAge={500}
        pointCount={50}
        offsetFactor={0.05}
        enableFade={true}
        enableShaderEffect={false}
        backgroundColor={[0, 0, 0, 0]}
      />

      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="App">
          <Navbar />
          <Leaderboard />
          <Members />
          <Footer />
                        {/* ← add */}
        </div>
      )}
    </>
  );
}