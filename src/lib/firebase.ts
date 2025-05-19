import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDnz-TW_FiaBHtu0vzDReYR-RECIavgLnk",
  authDomain: "truc-graduation.firebaseapp.com",
  databaseURL: "https://truc-graduation-default-rtdb.asia-southeast1.firebasedatabase.app/", 
  projectId: "truc-graduation",
  storageBucket: "truc-graduation.app.com", 
  messagingSenderId: "54983111289",
  appId: "1:54983111289:web:b5dab8b5c9068130441aa8",
  measurementId: "G-2W0XPHVQKE"
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
