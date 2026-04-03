"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "../retroui/Button";
import Link from "next/link";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/hero.png"
          alt=""
          width={1920}
          height={1080}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",

            display: "block",
          }}
        />

        <div className="absolute inset-0 bg-black/20"></div>
      </div>


      <div
        className="relative flex flex-col items-center text-center"
        style={{ zIndex: 10 }}
      >

        <h1
          className="reveal max-w-5xl leading-[1.08] tracking-tight mb-6"
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
            color: "white",
            transitionDelay: "80ms",
          }}
        >
Track, manage, and grow

        {" "}
          <span className="relative inline-block" style={{ color: "#b45309" }}>
        your wealth
            <svg
              aria-hidden="true"
              viewBox="0 0 220 12"
              className="absolute -bottom-1 left-0 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8 Q55 2 110 8 Q165 14 218 6"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>

        </h1>

       


       <Link href="/dashboard">
        <Button > View Dashboard </Button>
       </Link>  
      </div>


    </section>
  );
}  