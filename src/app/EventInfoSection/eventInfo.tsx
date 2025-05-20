"use client"

import { motion } from "framer-motion"

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
}

export default function EventInfoSection() {
  return (
    <section
      className="py-10 sm:py-10 md:py-20 px-4 bg-[url('/image.png')] bg-cover bg-center bg-fixed text-center relative"
      // initial={{ opacity: 0, y: 50 }}
      // whileInView={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.8, ease: "easeOut" }}
      // viewport={{ once: true, amount: 0.3 }}
    >

      <div className="relative z-10">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-pink-600/80 rounded-xl sm:rounded-2xl py-1 sm:py-2 px-3 sm:px-4 text-white mb-6 sm:mb-10 md:mb-12 tracking-wide uppercase shadow-lg mx-auto inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          📅 Thông tin sự kiện
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto font-[DancingScript]">
          {[
            {
              icon: "🕒",
              title: "Thời gian",
              content: (
                <>
                  <strong>6-7h00 or 11h30</strong> ngày <strong>23/05/2025</strong>
                </>
              ),
            },
            {
              icon: "📍",
              title: "Địa điểm",
              content: (
                <>
                  Hội trường <strong>PHƯỢNG VỸ</strong>, Trường Đại học <strong>NÔNG LÂM</strong> Thành phố Hồ Chí Minh
                </>
              ),
            },
            {
              icon: "📞",
              title: "Liên hệ",
              content: (
                <>
                  <strong>Zalo:</strong> 0374440531
                  <div className="mt-1">
                    <strong>FB</strong> Trương Phan Ngọc Trúc
                  </div>
                </>
              ),
            },
            {
              icon: "🎀",
              title: "Dresscode",
              content: (
                <>
                  <strong>Không cần</strong> váy áo lộng lẫy, chỉ cần mang theo <strong>nụ cười</strong> rạng rỡ trên
                  môi😊
                </>
              ),
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-pink-100 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:scale-105 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{item.icon}</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800">{item.title}</h3>
              <div className="text-pink-700 text-sm sm:text-base mt-1">{item.content}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
