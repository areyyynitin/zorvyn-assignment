"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FULL_IMAGE = "/clean_nature_chill_202604031505.png"; // <-- combine your 3 images into 1

const CARD_BACKS = [
  {  bg: "#b2b2b2", color: "#0f0f0f", text: "This is where you can write description that no one reads..." },
  {  bg: "#ce2017", color: "#ffffff", text: "This is where you can write description that no one reads...again" },
  {  bg: "#2f2f2f", color: "#ffffff", text: "Ohh you finally read!" },
];

export default function ScrollCards() {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const stickyHeaderRef = useRef<HTMLHeadingElement>(null);

  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = cardContainerRef.current!;
    const header = stickyHeaderRef.current!;
    const [c1, c2, c3] = cardRefs.map((r) => r.current!);

    gsap.set(container, { width: "75%" });
    gsap.set([c1, c2, c3], { x: 0 });

    const map = (p: number, i0: number, i1: number, o0: number, o1: number) => {
      const t = Math.max(0, Math.min(1, (p - i0) / (i1 - i0)));
      return o0 + t * (o1 - o0);
    };

    const st = ScrollTrigger.create({
      trigger: ".sc-sticky",
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      scrub: true,
      pin: true,

      onUpdate: (self) => {
        const p = self.progress;

        gsap.set(header, {
          y: map(p, 0.1, 0.25, 40, 0),
          opacity: map(p, 0.1, 0.25, 0, 1),
        });

        const gapT = map(p, 0.35, 0.6, 0, 1);
        const gapPx = gapT * 20;

        gsap.set([c1, c2, c3], {
          x: (i) => {
            if (i === 0) return -gapPx;
            if (i === 2) return gapPx;
            return 0;
          },
        });

        const flipT = map(p, 0.7, 0.95, 0, 1);

        gsap.set(container, {
          width: `${map(p, 0, 0.25, 75, 60)}%`,
        });

        gsap.set(c1, {
          borderRadius: `20px ${gapPx}px ${gapPx}px 20px`,
          rotationY: flipT * 180,
          y: flipT * 30,
          rotationZ: flipT * -15,
        });

        gsap.set(c2, {
          borderRadius: `${gapPx}px`,
          rotationY: flipT * 180,
        });

        gsap.set(c3, {
          borderRadius: `${gapPx}px 20px 20px ${gapPx}px`,
          rotationY: flipT * 180,
          y: flipT * 30,
          rotationZ: flipT * 15,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        .sc-card-container {
          display: flex;
        }

        .sc-card {
          transform-style: preserve-3d;
          transform: translateZ(0);
        }

        .sc-card-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: inherit;
          overflow: hidden;
        }

        .sc-card-back {
          transform: rotateY(180deg);
        }

        .sc-card-front {
          background-repeat: no-repeat;
        }
      `}</style>

      <div className="bg-[#0f0f0f] text-white">

        <section className="w-full h-svh flex items-center justify-center text-center px-8">
          <h1 className="text-5xl max-w-7xl ">
          Record income or expenses with a simple input flow, and keep your financial data organized and up to date.
          </h1>
        </section>

        <section className="sc-sticky relative w-full h-svh flex items-center justify-center">

          <div
            className="absolute z-10"
            style={{ top: "20%", left: "50%", transform: "translate(-50%, -50%)" }}
          >
            <h1 ref={stickyHeaderRef} className="text-4xl opacity-0">
            Finance Dashboard 
            </h1>
          </div>

          <div
            ref={cardContainerRef}
            className="sc-card-container"
            style={{ width: "75%", perspective: "1000px" }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                ref={cardRefs[i]}
                className="sc-card relative"
                style={{
                  width: "33.3333%",
                  aspectRatio: "5/7",
                  borderRadius:
                    i === 0
                      ? "20px 0 0 20px"
                      : i === 2
                      ? "0 20px 20px 0"
                      : "0",
                }}
              >
                <div
                  className="sc-card-face sc-card-front"
                  style={{
                    backgroundImage: `url(${FULL_IMAGE})`,
                    backgroundSize: "300% 100%",
                    backgroundPosition:
                      i === 0
                        ? "0% 50%"
                        : i === 1
                        ? "50% 50%"
                        : "100% 50%",
                  }}
                />

                <div
                  className="sc-card-face sc-card-back flex items-center justify-center text-center p-8"
                  style={{
                    background: CARD_BACKS[i].bg,
                    color: CARD_BACKS[i].color,
                  }}
                >
                  
                  <p className="text-2xl">{CARD_BACKS[i].text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full h-svh flex items-center justify-center text-center px-8">
          <h1 className="text-5xl max-w-7xl">
         Switch seamlessly between Light and Dark Mode for a comfortable viewing experience anytime. With Admin Role Access
          </h1>
        </section>

      </div>
    </>
  );
}