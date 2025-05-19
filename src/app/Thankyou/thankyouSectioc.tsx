'use client'

import { motion } from "framer-motion"

export default function ThankyouSection() {
  return (
    <>
      {/* Section Cảm Ơn + Hình ảnh kèm */}
      <motion.section
        className="py-16 px-4 bg-pink-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Nội dung cảm ơn */}
          <div className="flex-1 text-center md:text-left">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-pink-600 mb-4 font-[DancingScript]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              💖 Lời cảm ơn từ đáy lòng 💖
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Mình xin gửi lời cảm ơn chân thành nhất đến gia đình, bạn bè và tất cả mọi người đã đồng hành, cổ vũ và yêu thương mình trong suốt hành trình học tập. Không có mọi người, sẽ không có ngày hôm nay. Cảm ơn vì đã là một phần ý nghĩa trong cuộc sống của mình 🌷✨
            </motion.p>
          </div>

          {/* Hình ảnh */}
          <div className="flex-1 flex gap-4 justify-center md:justify-end">
            <motion.img
              src="Art Love Sticker by Yasislas.gif"
              alt="Ảnh cảm ơn 1"
              className="w-40 h-40 object-cover rounded-2xl shadow-lg"
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.img
              src="/Happy Thank U Sticker by Demic.gif"
              alt="Ảnh cảm ơn 2"
              className="w-40 h-40 object-cover rounded-2xl shadow-lg"
              initial={{ opacity: 0, rotate: 5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </motion.section>

      {/* Section Nhắn Nhủ */}
      <motion.section
        className="text-center py-16 px-4 bg-gradient-to-t from-white to-pink-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-700 mb-4 font-[DancingScript]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          📷 Nhớ quay lại sau lễ nhé!
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg max-w-xl mx-auto text-gray-700 italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Sau khi buổi lễ tốt nghiệp kết thúc, mình sẽ cập nhật thêm thật nhiều hình ảnh và khoảnh khắc tuyệt vời tại đây. Hẹn gặp lại bạn nhé! 💌📸
        </motion.p>
      </motion.section>
    </>
  );
}
