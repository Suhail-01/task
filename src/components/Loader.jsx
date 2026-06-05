import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Loader.css";

const Loader = ({ onComplete }) => {
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const textPaths = document.querySelectorAll(".loader svg textPath");

    const startTextLengths = Array.from(textPaths).map((tp) =>
      parseFloat(tp.getAttribute("textLength"))
    );
    const startTextOffsets = Array.from(textPaths).map((tp) =>
      parseFloat(tp.getAttribute("startOffset"))
    );

    const targetTextLengths = [4000, 3500, 3250, 3000, 2500, 2000, 1500, 1250];
    const orbitRadii = [775, 700, 625, 550, 475, 400, 325, 250];
    const maxOrbitRadius = orbitRadii[0];
    const maxAnimDuration = 1.25;
    const minAnimDuration = 1;

    textPaths.forEach((textPath, index) => {
      const animationDelay = (textPaths.length - 1 - index) * 0.1;
      const currentOrbitRadius = orbitRadii[index];
      const currentDuration =
        minAnimDuration +
        (currentOrbitRadius / maxOrbitRadius) * (maxAnimDuration - minAnimDuration);
      const pathLength = 2 * Math.PI * currentOrbitRadius * 3;
      const textLengthIncrease = targetTextLengths[index] - startTextLengths[index];
      const offsetAdjustment = (textLengthIncrease / 2 / pathLength) * 100;
      const targetOffset = startTextOffsets[index] - offsetAdjustment;

      gsap.to(textPath, {
        attr: {
          textLength: targetTextLengths[index],
          startOffset: targetOffset + "%",
        },
        duration: currentDuration,
        delay: animationDelay,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        repeatDelay: 0,
      });
    });

    // Rotation animation
    let rotationTween = null;
    let loaderRotation = 0;

    function animateRotation() {
      const svgElement = document.querySelector(".loader svg");
      if (!svgElement || !mountedRef.current) return;
      const spinDirection = Math.random() < 0.5 ? 1 : -1;
      loaderRotation += 25 * spinDirection;
      rotationTween = gsap.to(svgElement, {
        rotation: loaderRotation,
        duration: 2,
        ease: "power2.inOut",
        onComplete: animateRotation,
      });
    }
    animateRotation();

    // Counter
    const counterText = document.querySelector(".counter p");
    const count = { value: 0 };
    gsap.to(count, {
      value: 100,
      duration: 4,
      delay: 1,
      ease: "power1.out",
      onUpdate: function () {
        if (counterText) counterText.textContent = Math.floor(count.value);
      },
    });

    // Orbit text fade in
    const orbitTextElements = document.querySelectorAll(".orbit-text");
    gsap.set(orbitTextElements, { opacity: 0 });
    const orbitTextsReversed = Array.from(orbitTextElements).reverse();

    gsap.to(orbitTextsReversed, {
      opacity: 1,
      duration: 0.75,
      stagger: 0.125,
      ease: "power1.out",
    });

    // Fade out + complete — KEY FIX: never call .remove() manually
    const loaderRef = document.querySelector(".loader");
    gsap.to(orbitTextsReversed, {
      opacity: 0,
      duration: 0.75,
      stagger: 0.1,
      delay: 6,
      ease: "power1.out",
      onComplete: function () {
        if (!mountedRef.current) return;
        // Just fade opacity — let React unmount via onComplete → setLoading(false)
        gsap.to(".loader", {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            if (mountedRef.current && onComplete) {
              onComplete(); // triggers setLoading(false) in App → React unmounts cleanly
            }
          },
        });
      },
    });

    return () => {
      mountedRef.current = false;
      // Only kill loader-specific tweens, not global "*"
      gsap.killTweensOf(".loader svg");
      gsap.killTweensOf(".loader svg textPath");
      gsap.killTweensOf(".orbit-text");
      gsap.killTweensOf(".counter p");
      gsap.killTweensOf(count);
    };
  }, [onComplete]);

  return (
    <div className="loader">
      <svg viewBox="-425 -425 1850 1850" xmlns="http://www.w3.org/2000/svg">
        <path id="loader-orbit-1" d="M 500,-275 A 775,775 0 0,1 500,1275 A 775,775 0 0,1 500,-275 A 775,775 0 0,1 500,1275 A 775,775 0 0,1 499.99,-275" />
        <path id="loader-orbit-2" d="M 500,-200 A 700,700 0 0,1 500,1200 A 700,700 0 0,1 500,-200 A 700,700 0 0,1 500,1200 A 700,700 0 0,1 499.99,-200" />
        <path id="loader-orbit-3" d="M 500,-125 A 625,625 0 0,1 500,1125 A 625,625 0 0,1 500,-125 A 625,625 0 0,1 500,1125 A 625,625 0 0,1 499.99,-125" />
        <path id="loader-orbit-4" d="M 500,-50 A 550,550 0 0,1 500,1050 A 550,550 0 0,1 500,-50 A 550,550 0 0,1 500,1050 A 550,550 0 0,1 499.99,-50" />
        <path id="loader-orbit-5" d="M 500,25 A 475,475 0 0,1 500,975 A 475,475 0 0,1 500,25 A 475,475 0 0,1 500,975 A 475,475 0 0,1 499.99,25" />
        <path id="loader-orbit-6" d="M 500,100 A 400,400 0 0,1 500,900 A 400,400 0 0,1 500,100 A 400,400 0 0,1 500,900 A 400,400 0 0,1 499.99,100" />
        <path id="loader-orbit-7" d="M 500,175 A 325,325 0 0,1 500,825 A 325,325 0 0,1 500,175 A 325,325 0 0,1 500,825 A 325,325 0 0,1 499.99,175" />
        <path id="loader-orbit-8" d="M 500,250 A 250,250 0 0,1 500,750 A 250,250 0 0,1 500,250 A 250,250 0 0,1 500,750 A 250,250 0 0,1 499.99,250" />

        <text className="orbit-text">
          <textPath href="#loader-orbit-1" startOffset="30%" textLength="300">Developer</textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-2" startOffset="31%" textLength="280">Frontend</textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-3" startOffset="33%" textLength="240">Creative</textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-4" startOffset="32%" textLength="260">Designer</textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-5" startOffset="30%" textLength="290">Portfolio</textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-6" startOffset="31%" textLength="200">Digital</textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-7" startOffset="33%" textLength="210">Modern</textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-8" startOffset="32%" textLength="190">Design</textPath>
        </text>
      </svg>

      <div className="counter">
        <p>0</p>
      </div>
    </div>
  );
};

export default Loader;