import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NightSky({ isAwake = false }) {
  const [shootingStar, setShootingStar] = useState(null);

  // 3D star layers for parallax depth
  const [stars] = useState(() => {
    const layers = [
      { count: 60, size: [0.5, 1.5], depth: 0.2, opacity: [0.3, 0.7] }, // far
      { count: 40, size: [1, 2], depth: 0.5, opacity: [0.5, 0.9] }, // mid
      { count: 20, size: [1.5, 3], depth: 1.0, opacity: [0.7, 1.0] }, // near
    ];
    const allStars = [];
    let id = 0;
    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        allStars.push({
          id: id++,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size:
            Math.random() * (layer.size[1] - layer.size[0]) + layer.size[0],
          delay: Math.random() * 3,
          duration: Math.random() * 3 + 2,
          depth: layer.depth,
          minOpacity: layer.opacity[0],
          maxOpacity: layer.opacity[1],
          twinkleSpeed: Math.random() * 2 + 2,
        });
      }
    });
    return allStars;
  });

  // Shooting stars
  useEffect(() => {
    const trigger = () => {
      const id = Date.now();
      setShootingStar({
        id,
        startX: Math.random() * 40 + 5,
        startY: Math.random() * 30 + 5,
      });
      setTimeout(() => setShootingStar(null), 2200);
    };
    const initialTimeout = setTimeout(trigger, 2000);
    const interval = setInterval(trigger, 12000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        background: isAwake
          ? "radial-gradient(ellipse at 50% 30%, #1a1040 0%, #0f0a25 40%, #050210 100%)"
          : "radial-gradient(ellipse at 50% 30%, #0a0525 0%, #050210 50%, #000005 100%)",
        transition: "background 2s ease",
        perspective: "1000px",
        zIndex: 0,
      }}
    >
      {/* Milky Way band — diagonal */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isAwake ? 0.15 : 0.08 }}
        transition={{ duration: 2 }}
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(160,140,220,0.15) 45%, rgba(200,180,255,0.2) 50%, rgba(160,140,220,0.15) 55%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Nebula clouds — 3 color blobs */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full"
        animate={{
          opacity: isAwake ? 0.35 : 0.2,
          scale: [1, 1.1, 1],
        }}
        transition={{
          opacity: { duration: 2 },
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full"
        animate={{
          opacity: isAwake ? 0.3 : 0.15,
          scale: [1, 1.15, 1],
        }}
        transition={{
          opacity: { duration: 2 },
          scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full"
        animate={{
          opacity: isAwake ? 0.25 : 0.12,
        }}
        transition={{ duration: 2 }}
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* 3D Star field */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow:
              star.depth > 0.7
                ? `0 0 ${star.size * 3}px rgba(200, 220, 255, 0.6)`
                : "none",
          }}
          animate={{
            opacity: isAwake
              ? [star.minOpacity, star.maxOpacity, star.minOpacity]
              : [
                  star.minOpacity * 0.5,
                  star.maxOpacity * 0.7,
                  star.minOpacity * 0.5,
                ],
          }}
          transition={{
            duration: star.twinkleSpeed,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting star with trail */}
      {shootingStar && (
        <motion.div
          key={shootingStar.id}
          className="absolute"
          initial={{
            left: `${shootingStar.startX}%`,
            top: `${shootingStar.startY}%`,
            opacity: 0,
          }}
          animate={{
            left: `${shootingStar.startX + 40}%`,
            top: `${shootingStar.startY + 45}%`,
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div className="relative">
            <div
              className="w-1.5 h-1.5 bg-white rounded-full"
              style={{
                boxShadow: "0 0 15px 5px rgba(255,255,255,0.9)",
              }}
            />
            <div
              className="absolute top-1/2 left-0 w-40 h-[2px]"
              style={{
                background:
                  "linear-gradient(to left, rgba(255,255,255,0.9), rgba(255,255,255,0.4), transparent)",
                transform: "translateX(-100%) translateY(-50%) rotate(48deg)",
                transformOrigin: "right center",
                filter: "blur(0.5px)",
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Moonlight wash when awake */}
      {isAwake && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 25%, rgba(200,220,255,0.12) 0%, transparent 50%)",
          }}
        />
      )}

      {/* Bottom atmospheric haze */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%]"
        style={{
          background: isAwake
            ? "linear-gradient(to top, rgba(30,20,60,0.6), transparent)"
            : "linear-gradient(to top, rgba(10,5,25,0.5), transparent)",
        }}
      />
    </div>
  );
}