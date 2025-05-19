'use client'

import { motion } from 'framer-motion'

export default function GoogleMapSection() {
  return (
    <motion.section
      className="py-12 px-4 text-center "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        className=" mx-auto bg-pink-500 hover:bg-pink-600 text-white text-lg font-[DancingScript] py-2 px-6 rounded-lg mb-5 w-70 uppercase font-bold"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
      >
        🗺️ Địa điểm tổ chức
      </motion.h2>

      <motion.div
        className="w-full max-w-7xl mx-auto rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        viewport={{ once: true }}
      >
        <iframe
          className="w-full h-96"
          src="https://www.google.com/maps?q=10.8719441,106.7927799&t=k&z=21&output=embed"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </motion.div>
    </motion.section>
  )
}
