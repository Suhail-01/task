import React, { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Leaderboard from "./components/Leaderboard";
import Members from "./components/Members";
import Footer from "./components/Footer";
import Ribbons from "./components/Ribbons";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  // FIX: control body scroll + touch based on loading state — UNCHANGED
  useEffect(() => {
    if (loading) {
      document.body.classList.add("loader-active");
      document.body.classList.remove("loader-done");
    } else {
      document.body.classList.remove("loader-active");
      document.body.classList.add("loader-done");
    }
  }, [loading]);

  // FIX: Lenis only on desktop, native touch scroll on mobile
  useEffect(() => {
    if (loading) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // mobile uses native scroll — no Lenis

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading]);

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
        </div>
      )}
    </>
  );
}