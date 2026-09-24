import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

export default function Moon({ isAwake }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 60,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 60,
    damping: 20,
  });

  useEffect(() => {
    const handle = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  return (
    <div
      className="relative flex flex-col items-center z-20 pointer-events-none"
      style={{ perspective: 1200 }}
    >
      {/* Outer realistic glow — halo ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          opacity: isAwake ? 1 : 0.2,
          scale: isAwake ? [1, 1.12, 1] : 1,
        }}
        transition={{
          opacity: { duration: 2 },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          width: "460px",
          height: "460px",
          background: isAwake
            ? "radial-gradient(circle, rgba(200,220,255,0.35) 0%, rgba(180,200,255,0.15) 25%, rgba(150,170,220,0.05) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(80,100,160,0.15) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      {/* Moon with 3D tilt */}
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Sphere container */}
        <div
          className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            boxShadow: isAwake
              ? `
                inset -30px -30px 80px rgba(60,80,140,0.5),
                0 0 80px 20px rgba(200,220,255,0.5),
                0 0 150px 60px rgba(180,200,255,0.25),
                0 0 250px 100px rgba(140,160,220,0.15)
              `
              : `
                inset -25px -25px 60px rgba(0,0,0,0.85),
                0 0 40px 8px rgba(100,120,180,0.2)
              `,
            transition: "box-shadow 2s ease",
          }}
        >
          {/* Realistic moon texture — rotating */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/moon-texture.jpg")',
              backgroundSize: "200% 100%",
              backgroundPosition: "center",
              filter: isAwake
                ? "brightness(1.2) contrast(1.1) saturate(0.9)"
                : "brightness(0.25) contrast(1.2) saturate(0.4)",
              transition: "filter 2s ease",
            }}
          />

          {/* Realistic lighting overlay — light from top-left */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: isAwake
                ? `radial-gradient(circle at 30% 30%, 
                    rgba(255,255,255,0.4) 0%, 
                    rgba(255,255,255,0.05) 20%,
                    transparent 40%,
                    rgba(0,0,0,0.15) 75%,
                    rgba(0,0,0,0.5) 100%)`
                : `radial-gradient(circle at 30% 30%, 
                    rgba(255,255,255,0.1) 0%, 
                    transparent 30%,
                    rgba(0,0,0,0.4) 75%,
                    rgba(0,0,0,0.85) 100%)`,
              transition: "background 2s ease",
            }}
          />

          {/* Soft specular highlight */}
          <motion.div
            className="absolute rounded-full"
            animate={{ opacity: isAwake ? 0.55 : 0.1 }}
            transition={{ duration: 2 }}
            style={{
              top: "10%",
              left: "18%",
              width: "30%",
              height: "30%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />

          {/* Rim light on the lit side */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ opacity: isAwake ? 1 : 0 }}
            transition={{ duration: 2 }}
            style={{
              boxShadow:
                "inset 20px 20px 40px rgba(255,255,255,0.15), inset -10px -10px 30px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}