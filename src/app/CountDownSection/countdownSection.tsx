"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const graduationDate = new Date("2025-05-23T11:30:00")

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function getTimeLeft() {
    const now = new Date()
    const difference = graduationDate.getTime() - now.getTime()

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return (
    <motion.section
      className="bg-pink-200 py-8 sm:py-10 md:py-12 px-4 text-center font-[DancingScript] text-pink-700"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        ⏳ Đếm ngược đến ngày Ngọc Trúc tốt nghiệp!
      </motion.h2>

      {/* Nếu countdown kết thúc, show thêm hộp chúc mừng */}
      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-6 sm:mb-8 max-w-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-3xl p-4 sm:p-6 text-lg sm:text-xl md:text-2xl text-pink-800 font-semibold"
        >
          🎓 Ngọc Trúc đã <span className="text-pink-600 font-bold">chính thức tốt nghiệp</span> rồi đóoo!
          <br />🌟 Chúc mừng hành trình mới với thật nhiều thành công và yêu thương! 💐
        </motion.div>
      )}

      {/* TimeBox luôn hiển thị kể cả khi countdown về 0 */}
      <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 text-base sm:text-lg md:text-xl font-semibold flex-wrap">
        <TimeBox label="Ngày" value={timeLeft.days} />
        <TimeBox label="Giờ" value={timeLeft.hours} />
        <TimeBox label="Phút" value={timeLeft.minutes} />
        <TimeBox label="Giây" value={timeLeft.seconds} />
      </div>
    </motion.section>
  )
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <motion.div
      className="bg-white rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 shadow-md w-16 sm:w-20 md:w-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl text-pink-600 font-bold"
        >
          {value.toString().padStart(2, "0")}
        </motion.div>
      </AnimatePresence>
      <div className="text-xs sm:text-sm md:text-base text-gray-600">{label}</div>
    </motion.div>
  )
}
