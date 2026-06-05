import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const LINKS = {
  EMPIREDROP: ["Home", "Battles", "Boxes", "Upgrade", "Tower"],
  FEATURES:   ["Affiliates", "Rewards", "Challenges", "Blog", "CSDROP"],
  LEGAL:      ["Privacy Policy", "Terms of service", "Cookie Policy", "Affiliate Policy"],
  SUPPORT:    ["Live Support", "Jobs"],
};

const SEO_LANGS = [
  "Online mystery box", "Boîte mystère en ligne", "Online Überraschungsbox",
  "Caja misteriosa online", "Scatola misteriosa online", "Online rejtélyes doboz",
  "Paslaptinga dėžutė internetu", "Онлайн мистери бокс", "Caixa misteriosa online",
  "Tajemnicze pudełko online", "Online misteriozna kutija",
];

const SOCIALS = [
  { icon: "𝕏",  label: "Twitter"   },
  { icon: "📷", label: "Instagram" },
  { icon: "🎮", label: "Kick"      },
  { icon: "▶",  label: "YouTube"   },
  { icon: "✈",  label: "Telegram"  },
];

const PAYMENTS = ["BC", "💎", "🔷", "+8", "VISA", "MC", "ZEN"];

export default function Footer() {
  const footerRef = useRef(null);
  const topRef    = useRef(null);
  const colRefs   = useRef([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(topRef.current, {
        scrollTrigger: { trigger: topRef.current, start: "top 90%", once: true },
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
      });

      colRefs.current.forEach((col, i) => {
        if (!col) return;
        gsap.from(col, {
          scrollTrigger: { trigger: col, start: "top 92%", once: true },
          y: 24, opacity: 0, duration: 0.6,
          delay: i * 0.08,
          ease: "power2.out",
        });
      });

      gsap.from(bottomRef.current, {
        scrollTrigger: { trigger: bottomRef.current, start: "top 98%", once: true },
        opacity: 0, duration: 0.7, ease: "power2.out",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>

      <div className="footer-divider" />

      <div className="footer-inner">

        <div className="footer-top" ref={topRef}>
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">◆</span>
              <span className="footer-logo-text">Empire<b>Drop</b></span>
            </div>
            <p className="footer-assist">Need assistance</p>
            <a className="footer-email" href="mailto:contact@empiredrop.com">contact@empiredrop.com</a>
            <a className="footer-email" href="mailto:marketing@empiredrop.com">marketing@empiredrop.com</a>
          </div>

          <div className="footer-links">
            {Object.entries(LINKS).map(([title, links], i) => (
              <div
                className="footer-col"
                key={title}
                ref={(el) => (colRefs.current[i] = el)}
              >
                <h4 className="footer-col-title">{title}</h4>
                <ul>
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="footer-link">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-seo">
          {SEO_LANGS.map((lang, i) => (
            <span key={lang}>
              <a href="#" className="footer-seo-link">{lang}</a>
              {i < SEO_LANGS.length - 1 && <span className="footer-seo-sep"> | </span>}
            </span>
          ))}
        </div>

        <div className="footer-bottom" ref={bottomRef}>
          <div className="footer-bottom-left">
            <p className="footer-copy">© 2026 EmpireDrop. All rights reserved.</p>
            <p className="footer-legal-text">
              EmpireDrop is operated by EmpireDrop LTD a company registered in the Republic
              of Cyprus, with registration number HE452989, with registered office address
              1 Souliou Street, Strovolos, 2018 Nicosia.
            </p>
          </div>

          <div className="footer-bottom-right">
            <div className="footer-socials">
              {SOCIALS.map(s => (
                <a key={s.label} href="#" className="footer-social-btn" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="footer-payments">
              {PAYMENTS.map(p => (
                <span key={p} className="footer-payment-badge">{p}</span>
              ))}
            </div>

            <div className="footer-currency">
              <span>🇬🇧</span>
              <span>EUR</span>
              <span>▾</span>
            </div>
          </div>
        </div>

        <p className="footer-version">v1.4.65</p>
      </div>
    </footer>
  );
}