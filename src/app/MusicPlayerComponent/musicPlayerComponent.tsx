"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function MusicPlayerComponent() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)

  // Tự động phát nhạc khi trang được load
  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current?.play()
      } catch (err) {
        console.log("Trình duyệt chặn tự động phát nhạc 😢", err)
        setIsPlaying(false)
      }
    }
    playAudio()
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-50">
      <div className="relative">
        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-pink-100 text-pink-800 px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-md"
          >
            {isPlaying ? "Tắt nhạc" : "Phát nhạc"}
          </motion.div>
        )}

        {/* Music button */}
        <motion.button
          onClick={togglePlay}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="bg-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Tắt nhạc" : "Phát nhạc"}
        >
          <span className="text-2xl sm:text-3xl">{isPlaying ? "🎵" : "🔇"}</span>
        </motion.button>
      </div>
      <audio ref={audioRef} src="/songs-to-sing--dance.mp3" loop />
    </div>
  )
}
