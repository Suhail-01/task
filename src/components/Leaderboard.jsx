import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fullCard from "../assets/fullcard.png";
import "./leaderboard.css";
import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";
gsap.registerPlugin(ScrollTrigger);

export default function Leaderboard() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stageRef = useRef(null);
  const fullImageRef = useRef(null);
  const cardContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const cardBackData = [
    {
      rank: 2,
      player: "S***...",
      opened: "€32,432.02",
      prize: "€10,000",
      prizeColor: "#C0C0C0",
      trophyColor: "#C0C0C0",
      icon: "🥈",
      initials: "S",
      img: pic2,
    },
    {
      rank: 1,
      player: "J***...",
      opened: "€51,484.50",
      prize: "€25,000",
      prizeColor: "#FFD700",
      trophyColor: "#FFD700",
      icon: "🏆",
      initials: "J",
      img: pic1,
    },
    {
      rank: 3,
      player: "elp*****rno",
      opened: "€26,862.55",
      prize: "€5,000",
      prizeColor: "#CD7F32",
      trophyColor: "#CD7F32",
      icon: "🥉",
      initials: "E",
      img: pic3,
    },
  ];

  const rankSuffix = (r) => (r === 1 ? "st" : r === 2 ? "nd" : "rd");

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stage = stageRef.current;
    const fullImage = fullImageRef.current;
    const cardContainer = cardContainerRef.current;
    const cards = cardRefs.current;

    if (!section || !header || !stage || !fullImage || !cardContainer || cards.length !== 3)
      return;

    let splitDone = false;
    let flipDone = false;

    const ctx = gsap.context(() => {
      gsap.set(header, { y: 40, opacity: 0 });
      gsap.set(stage, { width: "72vw" });
      gsap.set(fullImage, { opacity: 1 });
      gsap.set(cardContainer, { opacity: 0, gap: "0px" });
      gsap.set(cards, { borderRadius: "0px", rotationY: 0.1, y: 0, rotationZ: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 4}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const isMobile = window.innerWidth <= 768;

          // Header animation — UNCHANGED
          if (progress <= 0.15) {
            const p = gsap.utils.mapRange(0, 0.15, 0, 1, progress);
            gsap.set(header, { y: gsap.utils.mapRange(0, 1, 40, 0, p), opacity: p });
          } else {
            gsap.set(header, { y: 0, opacity: 1 });
          }

          // Full image / card container fade — UNCHANGED
          if (progress <= 0.22) {
            const p = gsap.utils.mapRange(0, 0.22, 0, 1, progress);
            gsap.set(fullImage, { opacity: gsap.utils.mapRange(0, 1, 1, 0, p) });
            gsap.set(cardContainer, { opacity: gsap.utils.mapRange(0, 1, 0, 1, p) });
          } else {
            gsap.set(fullImage, { opacity: 0 });
            gsap.set(cardContainer, { opacity: 1 });
          }

          // Stage width animation — UNCHANGED
          if (progress <= 0.3) {
            if (!isMobile) {
              const width = gsap.utils.mapRange(0, 0.3, 72, 60, progress);
              gsap.set(stage, { width: `${width}vw` });
            } else {
              gsap.set(stage, { width: "72vw" });
            }
          } else {
            if (!isMobile) gsap.set(stage, { width: "60vw" });
          }

          // Card split
          if (progress >= 0.32 && !splitDone) {
            gsap.to(cardContainer, { gap: "20px", duration: 0.7, ease: "power3.out" });
            gsap.to(cards, {
              // FIX 1: square corners on mobile, rounded on desktop
              borderRadius: isMobile ? "0px" : "22px",
              duration: 0.7,
              ease: "power3.out",
            });
            splitDone = true;
          }
          if (progress < 0.32 && splitDone) {
            gsap.to(cardContainer, { gap: "0px", duration: 0.7, ease: "power3.out" });
            gsap.to(cards, { borderRadius: "0px", duration: 0.7, ease: "power3.out" });
            splitDone = false;
          }

          // Card flip
// Card flip
if (progress >= 0.72 && !flipDone) {
  gsap.to(cards, {
    rotationY: 179.9,
    duration: 0.8,
    ease: "power3.inOut",
    stagger: 0.08,
  });
  // FIX: apply fan on BOTH mobile and desktop (smaller values for mobile)
  gsap.to([cards[0], cards[2]], {
    y: isMobile ? 15 : 30,
    rotationZ: (i) => isMobile ? [-8, 8][i] : [-12, 12][i],
    duration: 0.8,
    ease: "power3.inOut",
  });
  flipDone = true;
}
if (progress < 0.72 && flipDone) {
  gsap.to(cards, {
    rotationY: 0.1,
    duration: 0.8,
    ease: "power3.inOut",
    stagger: -0.08,
  });
  // FIX: reset fan on both mobile and desktop
  gsap.to([cards[0], cards[2]], {
    y: 0,
    rotationZ: 0,
    duration: 0.8,
    ease: "power3.inOut",
  });
  flipDone = false;
}
        },
      });
    }, section);

    setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sticky" ref={sectionRef}>
      <div className="sticky-header">
        <h1 ref={headerRef}>Three pillars with one purpose</h1>
      </div>

      <div className="image-stage" ref={stageRef}>
        <img src={fullCard} alt="" className="full-image" ref={fullImageRef} />

        <div className="card-container" ref={cardContainerRef}>
          {cardBackData.map((card, i) => (
            <div className="card" key={i} ref={(el) => (cardRefs.current[i] = el)}>
              <div className="card-front">
                <img
                  src={fullCard}
                  alt=""
                  className={`slice slice-${["left", "center", "right"][i]}`}
                />
              </div>
              <div className="card-back">
                <div className="cb-trophy" style={{ color: card.trophyColor }}>
                  {card.icon} {card.rank}
                  {rankSuffix(card.rank)} Place
                </div>
                <div className="cb-avatar">
                  <img src={card.img} alt={card.player} />
                </div>
                <div className="cb-name">{card.player}</div>
                <div className="cb-opened">Opened {card.opened}</div>
                <div className="cb-prize-label">Prize</div>
                <div
                  className="cb-prize-btn"
                  style={{ background: card.prizeColor, color: "#000" }}
                >
                  {card.prize}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}