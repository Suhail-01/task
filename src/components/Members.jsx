import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Members.css";

import pic1  from "../assets/pic1.jpg";
import pic2  from "../assets/pic2.jpg";
import pic3  from "../assets/pic3.jpg";
import pic4  from "../assets/pic4.jpg";
import pic5  from "../assets/pic5.jpg";
import pic6  from "../assets/pic6.jpg";
import pic7  from "../assets/ic7.jpg";
import pic8  from "../assets/pic8.jpg";
import pic9  from "../assets/pic9.jpg";
import pic10 from "../assets/pic10.jpg";

gsap.registerPlugin(ScrollTrigger);

const AVATARS = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10];

const PLAYERS = [
  { rank: 4,  name: "B******a",        opened: "€25,780.67", prize: "€2,000.00", prizeVal: 2000 },
  { rank: 5,  name: "x******x",        opened: "€25,006.72", prize: "€1,000.00", prizeVal: 1000 },
  { rank: 6,  name: "A********7",      opened: "€19,063.09", prize: "€500.00",   prizeVal: 500  },
  { rank: 7,  name: "B****0",          opened: "€17,786.84", prize: "€500.00",   prizeVal: 500  },
  { rank: 8,  name: "Pr*********ys",   opened: "€16,508.52", prize: "€500.00",   prizeVal: 500  },
  { rank: 9,  name: "w*****w",         opened: "€16,276.84", prize: "€250.00",   prizeVal: 250  },
  { rank: 10, name: "L******8",        opened: "€15,907.37", prize: "€250.00",   prizeVal: 250  },
  { rank: 11, name: "N******a",        opened: "€15,537.80", prize: "€250.00",   prizeVal: 250  },
  { rank: 12, name: "L***",            opened: "€11,884.40", prize: "€250.00",   prizeVal: 250  },
  { rank: 13, name: "c******o",        opened: "€11,723.22", prize: "€250.00",   prizeVal: 250  },
  { rank: 14, name: "D*******1",       opened: "€10,768.47", prize: "€250.00",   prizeVal: 250  },
  { rank: 15, name: "Ano*********515", opened: "€10,581.28", prize: "€250.00",   prizeVal: 250  },
  { rank: 16, name: "Me********69",    opened: "€10,568.15", prize: "€250.00",   prizeVal: 250  },
  { rank: 17, name: "Si*******rr",     opened: "€10,540.87", prize: "€250.00",   prizeVal: 250  },
  { rank: 18, name: "Ano*********605", opened: "€10,449.69", prize: "€250.00",   prizeVal: 250  },
  { rank: 19, name: "T*******e",       opened: "€10,112.44", prize: "€250.00",   prizeVal: 250  },
  { rank: 20, name: "R*****9",         opened: "€9,988.21",  prize: "€250.00",   prizeVal: 250  },
  { rank: 21, name: "M******3",        opened: "€9,765.32",  prize: "€250.00",   prizeVal: 250  },
  { rank: 22, name: "D******1",        opened: "€9,302.83",  prize: "€250.00",   prizeVal: 250  },
  { rank: 23, name: "M*****o",         opened: "€9,291.66",  prize: "€250.00",   prizeVal: 250  },
  { rank: 24, name: "s********n",      opened: "€9,197.69",  prize: "€250.00",   prizeVal: 250  },
  { rank: 25, name: "Ano*********110", opened: "€8,285.96",  prize: "€250.00",   prizeVal: 250  },
  { rank: 26, name: "S***y",           opened: "€8,104.34",  prize: "€250.00",   prizeVal: 250  },
  { rank: 27, name: "Ano*********760", opened: "€7,815.19",  prize: "€250.00",   prizeVal: 250  },
  { rank: 28, name: "K*****6",         opened: "€7,800.77",  prize: "€250.00",   prizeVal: 250  },
  { rank: 29, name: "A**********394",  opened: "€7,579.05",  prize: "€250.00",   prizeVal: 250  },
  { rank: 30, name: "F*******z",       opened: "€7,341.18",  prize: "€250.00",   prizeVal: 250  },
];

const rankSuffix = (r) => {
  if (r === 11 || r === 12 || r === 13) return "th";
  const s = ["th", "st", "nd", "rd"];
  const v = r % 10;
  return s[v] || s[0];
};

const TOTAL_SECONDS = 2 * 86400 + 22 * 3600 + 40 * 60 + 17;

const prizeColor = (val) => {
  if (val >= 2000) return "#FFD700";
  if (val >= 1000) return "#C0C0C0";
  return "#4ade80";
};

export default function Members() {
  const sectionRef = useRef(null);
  const timerRef   = useRef(null);
  const headerRef  = useRef(null);
  const rowRefs    = useRef([]);
  const [secs, setSecs] = useState(TOTAL_SECONDS);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const dd = String(Math.floor(secs / 86400)).padStart(2, "0");
  const hh = String(Math.floor((secs % 86400) / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(timerRef.current, {
        scrollTrigger: { trigger: timerRef.current, start: "top 85%", once: true },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: headerRef.current, start: "top 88%", once: true },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.from(row, {
          scrollTrigger: { trigger: row, start: "top 92%", once: true },
          x: i % 2 === 0 ? -30 : 30,
          opacity: 0,
          duration: 0.55,
          delay: (i % 8) * 0.04,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="members" ref={sectionRef}>

      {/* COUNTDOWN TIMER */}
      <div className="mem-timer-wrap" ref={timerRef}>
        <p className="mem-timer-label">Leaderboard ends in</p>
        <div className="mem-timer">
          {[[dd, "Days"], [hh, "Hours"], [mm, "Minutes"], [ss, "Seconds"]].map(
            ([val, label], i) => (
              <div className="mem-timer-block" key={label}>
                <div className="mem-timer-digit">
                  <span className="mem-digit-top">{val}</span>
                  <span className="mem-digit-fold" />
                </div>
                <span className="mem-timer-unit">{label}</span>
                {i < 3 && <span className="mem-timer-sep">:</span>}
              </div>
            )
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="mem-table-wrap">
        <div className="mem-header" ref={headerRef}>
          <span className="mem-col-rank">#</span>
          <span className="mem-col-player">Player</span>
          <span className="mem-col-opened">Opened</span>
          <span className="mem-col-prize">Prize</span>
        </div>

        <div className="mem-rows">
          {PLAYERS.map((p, i) => (
            <div
              className="mem-row"
              key={p.rank}
              ref={(el) => (rowRefs.current[i] = el)}
            >
              <div className="mem-col-rank">
                <span className="mem-rank-badge">
                  {p.rank}
                  <sup>{rankSuffix(p.rank)}</sup>
                </span>
              </div>

              <div className="mem-col-player">
                <div className="mem-avatar">
                  <img
                    src={AVATARS[i % AVATARS.length]}
                    alt={p.name}
                  />
                </div>
                <span className="mem-name">{p.name}</span>
              </div>

              <div className="mem-col-opened">
                <span className="mem-opened">{p.opened}</span>
              </div>

              <div className="mem-col-prize">
                <span
                  className="mem-prize"
                  style={{ color: prizeColor(p.prizeVal) }}
                >
                  {p.prize}
                </span>
              </div>

              <div className="mem-row-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}