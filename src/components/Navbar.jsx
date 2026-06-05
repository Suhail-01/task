import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { gsap } from "gsap";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [time, setTime] = useState({ d: "02", h: "22", m: "52", s: "32" });
  const navRef = useRef(null);

  // Show navbar after scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Live countdown ticker
  useEffect(() => {
    const tick = setInterval(() => {
      setTime((prev) => {
        let s = parseInt(prev.s);
        let m = parseInt(prev.m);
        let h = parseInt(prev.h);
        let d = parseInt(prev.d);
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) d = 0;
        const pad = (n) => String(n).padStart(2, "0");
        return { d: pad(d), h: pad(h), m: pad(m), s: pad(s) };
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  // GSAP Animations (mobile-first)
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      "(max-width: 768px)": () => {
        // Mobile animation
        gsap.to(".nb-logo", { y: 4, opacity: 1, duration: 0.6 });
        gsap.to(".nb-btn--signup", { scale: 1.03, duration: 0.8 });
      },
      "(min-width: 769px)": () => {
        // Desktop animation
        gsap.from(".nb-links a", {
          x: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.from(".nb-center", { y: 10, opacity: 0, duration: 0.8 });
        gsap.from(".nb-btn--signup", { scale: 0.95, duration: 0.6 });
      },
    });

    return () => mm.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`navbar ${visible ? "navbar--visible" : ""} ${expanded ? "navbar--expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="nb-glass" />

      {/* MICRO BAR */}
      <div className="nb-micro">
        <div className="nb-micro-left">
          <span className="nb-tag">FAQ</span>
          <span className="nb-tag nb-tag--yellow">⚡ Daily Free</span>
          <span className="nb-tag">Support</span>
          <span className="nb-tag nb-tag--green">✔ Provably Fair</span>
          <span className="nb-tag nb-tag--blue">✈ Get Exclusive Bonus Now!</span>
          <span className="nb-tag nb-tag--gold">👑 VIP Club</span>
        </div>
        <div className="nb-micro-right">
          <span className="nb-tag">📷</span>
          <span className="nb-tag">𝕏</span>
          <span className="nb-tag">▶</span>
          <span className="nb-tag">💬</span>
          <span className="nb-tag">🎮</span>
          <span className="nb-tag">🇬🇧 EUR ▾</span>
        </div>
      </div>

      {/* MAIN BAR */}
      <div className="nb-main">
        {/* LEFT */}
        <div className="nb-left">
          <div className="nb-logo">
            <span className="nb-logo-icon">◆</span>
            <span className="nb-logo-text">Empire<b>Drop</b></span>
          </div>
          <div className="nb-links">
            <a className="nb-link" href="#">
              <span className="nb-link-icon">✦</span>
              <span className="nb-link-label">Games</span>
              <span className="nb-link-arrow">‹</span>
            </a>
            <a className="nb-link" href="#">
              <span className="nb-link-icon">🚀</span>
              <span className="nb-link-label">Challenges</span>
            </a>
            <a className="nb-link nb-link--rewards" href="#">
              <span className="nb-link-icon">🏆</span>
              <span className="nb-link-label">Rewards</span>
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div className="nb-center">
          <div className="nb-race">
            <div className="nb-race-icon">🏆</div>
            <div className="nb-race-info">
              <span className="nb-race-title">Weekly Race</span>
              <span className="nb-race-prize">€50,000</span>
            </div>
            <div className="nb-countdown">
              {[["d", "Days"], ["h", "Hrs"], ["m", "Min"], ["s", "Sec"]].map(([k, label]) => (
                <div className="nb-tick" key={k}>
                  <span className="nb-tick-val">{time[k]}</span>
                  <span className="nb-tick-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="nb-raffle">
            <div className="nb-raffle-icon">🎯</div>
            <div className="nb-raffle-info">
              <span className="nb-raffle-title">Daily Raffle</span>
              <span className="nb-raffle-prize">€2,500</span>
            </div>
            <div className="nb-raffle-counters">
              {["0", "0", "0", "0"].map((v, i) => (
                <div className="nb-rcount" key={i}>
                  <span className="nb-rcount-val">{v}</span>
                  <span className="nb-rcount-label">{["Players","Tickets","Winners","Ends"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="nb-right">
          <div className="nb-raffle-banner">
            <div className="nb-rb-inner">
              <span className="nb-rb-amount">€2 500</span>
              <span className="nb-rb-sub">DAILY RAFFLE</span>
            </div>
          </div>
          <a className="nb-btn nb-btn--shop" href="#">
            <span>🛍</span>
            <span className="nb-btn-label">Shop</span>
          </a>
          <a className="nb-btn nb-btn--signup" href="#">
            <span>🎁</span>
            <span className="nb-btn-label">Sign Up</span>
          </a>
          <a className="nb-btn nb-btn--login" href="#">Login</a>
        </div>
      </div>

      {/* HINT BAR */}
      <div className="nb-hint">
        <span className="nb-hint-pill">🏆 €50,000 Race</span>
        <span className="nb-hint-dot" />
        <span className="nb-hint-pill">🎯 €2,500 Raffle</span>
        <span className="nb-hint-dot" />
        <span className="nb-hint-pill nb-hint-pill--live">● LIVE</span>
      </div>
    </nav>
  );
}