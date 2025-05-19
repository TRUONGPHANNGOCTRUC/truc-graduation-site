"use client"

import { motion } from "framer-motion"

export default function IntroSection() {
  return (
    <motion.section
      className="text-center py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-pink-100 via-white to-white relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Decorative flowers with responsive positioning and sizing */}
      <motion.img
        src="Flowers Sticker.gif"
        className="absolute top-0 left-0 w-24 sm:w-32 md:w-40 lg:w-auto animate-float"
        alt="hoa trái"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      />
      <motion.img
        src="Twenty Seven Pink Sticker.gif"
        className="absolute bottom-0 right-0 w-24 sm:w-32 md:w-40 lg:w-auto animate-float-reverse"
        alt="hoa phải"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Content container with padding to prevent overlap with decorations */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-pink-700 font-[DancingScript]"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          🎓Lễ Tốt Nghiệp của Ngọc Trúc🎓
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-pink-600 italic max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Cùng mình đánh dấu một chương mới, nơi kết thúc và bắt đầu giao thoa ✨
        </motion.p>
      </div>
    </motion.section>
  )
}
