'use client'
import React, { useCallback, useEffect, useState } from "react";
import { ref, get, query, limitToFirst, startAfter, orderByKey } from "firebase/database";
import { db } from "@/lib/firebase";
import Image from "next/image";

const chunkArray = <T,>(arr: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};


const GraduationMemorySection = () => {
  type Memory = {
    key: string;
    type: "image" | "video";
    url: string;
  };
  
  const [memories, setMemories] = useState<Memory[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<Memory | null>(null);
  
  // const [memories, setMemories] = useState([]);
  // const [lastKey, setLastKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // const [modalContent, setModalContent] = useState(null);

  const LIMIT = 15;

  // const fetchMemories = async () => {
  //   setLoading(true);
  //   try {
  //     const memoryQuery = lastKey
  //       ? query(ref(db, "memories"), orderByKey(), startAfter(lastKey), limitToFirst(LIMIT))
  //       : query(ref(db, "memories"), orderByKey(), limitToFirst(LIMIT));

  //     const snapshot = await get(memoryQuery);
  //     const data = snapshot.val();
  //     if (data) {
  //       const entries = Object.entries(data);
  //       const newMemories = entries.map(([key, value]) => ({ key, ...value }));
      
  //       // Check for duplicate keys
  //       const uniqueNewMemories = newMemories.filter(
  //         (item) => !memories.some((m) => m.key === item.key)
  //       );
      
  //       setMemories((prev) => [...prev, ...uniqueNewMemories]);
      
  //       const lastEntryKey = entries[entries.length - 1][0];
  //       if (lastEntryKey === lastKey) {
  //         setHasMore(false); // Ngăn fetch tiếp
  //       } else {
  //         setLastKey(lastEntryKey);
  //       }
      
  //       if (entries.length < LIMIT) setHasMore(false);
  //     } else {
  //       setHasMore(false);
  //     }
      
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //   }
  //   setLoading(false);
  // };
  const fetchMemories = useCallback(async () => {
    setLoading(true);
    try {
      const memoryQuery = lastKey
        ? query(ref(db, "memories"), orderByKey(), startAfter(lastKey), limitToFirst(LIMIT))
        : query(ref(db, "memories"), orderByKey(), limitToFirst(LIMIT));
  
      const snapshot = await get(memoryQuery);
      const data = snapshot.val();
      if (data) {
        const entries = Object.entries(data);
        const newMemories = entries.map(([key, value]) => ({
          key,
          ...(value as { type: "image" | "video"; url: string;})
        }));
                // Chặn trùng key
        const uniqueMemories = newMemories.filter(
          (item) => !memories.some((m) => m.key === item.key)
        );
  
        setMemories((prev) => [...prev, ...uniqueMemories]);
        const lastEntryKey = entries[entries.length - 1][0];
        if (lastEntryKey === lastKey) {
          setHasMore(false);
        } else {
          setLastKey(lastEntryKey);
        }
        if (entries.length < LIMIT) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  }, [lastKey, memories]);
  
  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);
  

  const handleClick = (memory: Memory) => setModalContent(memory);
  const closeModal = () => setModalContent(null);

  const rows = chunkArray(memories, 5);

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-rose-100 to-pink-50 overflow-hidden">
      <h2 className="text-4xl font-extrabold font-[DancingScript] text-center text-pink-700 mb-10">
        🎓 Ký ức ngày tốt nghiệp
      </h2>

      <div className="space-y-10 px-4">
      {!loading && memories.length === 0 && (
          <div className="text-center text-pink-500 text-xl font-medium py-10">
            🥺 Hiện tại chưa có hình ảnh hay video nào được chia sẻ...<br />
          </div>
        )}

        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden group">
            <div
              className={`
                flex items-center gap-6 whitespace-nowrap 
                ${rowIndex % 2 === 0 ? "animate-marquee-reverse" : "animate-marquee"}
                group-hover:[animation-play-state:paused]
              `}
            >
              {row.map((memory, index) => (
                <div
                key={`${memory.key}-${index}`}
                  className="w-64 h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-md cursor-pointer relative"
                  onClick={() => handleClick(memory)}
                >
                  {memory.type === "image" ? (
                    <Image
                      src={memory.url}
                      alt={`Memory ${index}`}
                      fill
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={memory.url}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition backdrop-blur-sm">
                    <span className="text-white text-xl bg-black/50 px-3 py-1 rounded-full">👁️</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={fetchMemories}
            disabled={loading}
            className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
          >
            {loading ? "Đang tải..." : "Xem thêm"}
          </button>
        </div>
      )}

      {/* Modal Viewer */}
      {modalContent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="max-w-3xl w-full p-4 bg-white rounded-xl shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-black text-xl font-bold hover:text-red-600"
            >
              ✕
            </button>

            {modalContent.type === "image" ? (
              <Image
                src={modalContent.url}
                alt="Full View"
                fill
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <video
                src={modalContent.url}
                controls
                autoPlay
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
        </div>
      )}

      {/* Keyframes for marquee effect */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }

        .group:hover .animate-marquee,
        .group:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default GraduationMemorySection;
