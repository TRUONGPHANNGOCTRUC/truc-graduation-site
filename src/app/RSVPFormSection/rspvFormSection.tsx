'use client'

import { useEffect, useState } from 'react'
import { ref, push, onValue, remove } from "firebase/database"
import { db } from '@/lib/firebase'

export default function RSPVFormSection() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ key: string; name: string; message: string }[]>([])
  const [passwordPrompt, setPasswordPrompt] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [deleteKey, setDeleteKey] = useState<string | null>(null)

  const PASSWORD = 'chukkuSuperSecret123'

  useEffect(() => {
    const messageRef = ref(db, "messages")
    const listener = onValue(messageRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const loadedMessages = Object.entries(data).map(([key, value]) => ({
          key,
          ...(value as { name: string; message: string }),
        }))
        setMessages(loadedMessages.reverse())
      } else {
        setMessages([])
      }
    })

    return () => {
      // Firebase onValue doesn't require manual cleanup here
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name || !message) return

    const messageRef = ref(db, "messages")
    push(messageRef, { name, message })

    setName("")
    setMessage("")
  }

  const handleDeleteClick = (key: string) => {
    setPasswordPrompt(true)
    setPasswordInput('')
    setDeleteKey(key)
  }

  const handleConfirmDelete = () => {
    if (passwordInput === PASSWORD && deleteKey) {
      const messageRef = ref(db, `messages/${deleteKey}`)
      remove(messageRef)
      setPasswordPrompt(false)
      setPasswordInput('')
      setDeleteKey(null)
    } else {
      alert('Mật khẩu không đúng, bạn không thể xóa lời chúc này!')
    }
  }

  const handleCancelDelete = () => {
    setPasswordPrompt(false)
    setPasswordInput('')
    setDeleteKey(null)
  }

  const chunkArray = (arr: typeof messages, chunkSize: number) => {
    const chunks = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize))
    }
    return chunks
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-4 bg-pink-50 text-center font-[DancingScript] text-pink-600 relative">
      <div className="col-span-1 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">💌 Bạn có lời gì muốn nhắn gửi mình hong!!!</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên của bạn"
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Gửi đến mình những lời iu thương nha, mình thích được iu thương 😊"
            rows={7}
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-[DancingScript] py-2 px-6 rounded-lg"
          >
            Gửi lời chúc 🎉
          </button>
        </form>
      </div>

      <div className="col-span-1 mt-6 md:mt-0 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-pink-300 pt-4 md:pt-0 md:pl-4 overflow-hidden">
        {messages.length === 0 ? (
          <p className="text-pink-400 text-xl italic animate-pulse">
            ✨ Hãy là người đầu tiên gửi lời chúc cho mình nhé! ✨
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {chunkArray(messages, 10).slice(0, 5).map((group, groupIndex) => (
              <div key={groupIndex} className="animate-marquee whitespace-nowrap flex items-center gap-6">
                {group.map((msg) => (
                  <span key={msg.key} className="mx-4 text-pink-700 font-medium inline-flex items-center gap-2">
                    💌 <strong>{msg.name}:</strong> {msg.message}
                    <button
                      onClick={() => handleDeleteClick(msg.key)}
                      className="text-pink-600 hover:text-pink-800 font-bold text-sm cursor-pointer select-none"
                      title="Xóa lời chúc"
                      type="button"
                    >
                      ❌
                    </button>
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {passwordPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-pink-600">Nhập mật khẩu để xóa lời chúc</h3>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Mật khẩu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
              >
                Xác nhận
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
