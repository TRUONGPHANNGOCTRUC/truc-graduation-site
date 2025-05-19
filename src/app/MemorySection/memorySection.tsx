"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const videoVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

export default function MemorySection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const mediaList = [
    "/cnpm.jpg",
    "/tieupham.mp4",
    "/hi.jpg",
    "/ob7.jpg",
    "/canha.jpg",
    "/axon.jpg",
    "/fire.jpg",
    "/fireve.jpg",
    "/kkkkk.jpg",
    "/kho.jpg",
    "/hiii.jpg",
    "/bonho.jpg",
    "/6615288184566.mp4",
    "/mu.jpg",
    "/khoc.jpg",
    "/meanui.jpg",
    "/truockhoc.jpg",
    "/thayson.jpg",
    "/cntt.jpg",
    "/nammoi.jpg",
    "/checkin.jpg",
    "/snake.jpg",
    "/timelapse.mp4",
    "/2ne.jpg",
    "/mizy.jpg",
    "/4A.jpg",
    "/minhdam.jpg",
    "/quay.jpg",
  ]

  // Auto scroll logic with responsive speed
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    // Adjust scroll speed based on screen width
    const getScrollSpeed = () => {
      if (window.innerWidth < 640) return 0.8 // Slower on mobile
      if (window.innerWidth < 1024) return 1.2 // Medium on tablets
      return 1.5 // Default speed on desktop
    }

    let scrollSpeed = getScrollSpeed()

    // Update scroll speed on window resize
    const handleResize = () => {
      scrollSpeed = getScrollSpeed()
    }
    window.addEventListener("resize", handleResize)

    const interval = setInterval(() => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        scrollContainer.scrollLeft = 0 // Reset to beginning when reaching the end
      } else {
        scrollContainer.scrollLeft += scrollSpeed
      }
    }, 20)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="py-6 sm:py-8 md:py-10 px-3 sm:px-4">
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4 sm:mb-6 text-pink-600 font-[Dancing-scripts]"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        📸 Hành trình của mìnhhh
      </motion.h2>

      <div className="overflow-x-auto scrollbar-hide relative" ref={scrollRef}>
        {/* Gradient overlay for better UX */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-3 sm:gap-4 w-max px-2 py-1">
          {mediaList.map((src, i) => {
            const isVideo = src.endsWith(".mp4")
            return isVideo ? (
              <motion.video
                key={i}
                className="rounded-lg sm:rounded-xl shadow-md sm:shadow-lg w-[180px] h-[120px] sm:w-[240px] sm:h-[160px] md:w-[300px] md:h-[200px] flex-shrink-0 object-cover"
                src={src}
                muted
                loop
                autoPlay
                playsInline
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={videoVariants}
              />
            ) : (
              <motion.img
                key={i}
                className="rounded-lg sm:rounded-xl shadow-md sm:shadow-lg w-[180px] h-[120px] sm:w-[240px] sm:h-[160px] md:w-[300px] md:h-[200px] flex-shrink-0 object-cover"
                src={src}
                alt={`Memory ${i}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={videoVariants}
              />
            )
          })}
        </div>
      </div>

      {/* Manual scroll hint for mobile users */}
      <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 italic md:hidden">
        Vuốt sang để xem thêm kỷ niệm
      </p>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
