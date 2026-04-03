import HeroSection from "@/components/landing/hero";
import ScrollCards from "@/components/landing/stickyCards";
import ReactLenis from "lenis/react";

export default function page() {
  return (
    <div>
      <ReactLenis
       root
       options={{
         lerp: 0.1,
         duration: 1.2,
         smoothWheel: true,
         wheelMultiplier: 1,
        }}
        >

          <HeroSection />
          <ScrollCards/>
      


      </ReactLenis>

    </div>
  )
}