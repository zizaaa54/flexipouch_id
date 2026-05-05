"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from "../firebase";

export default function ProfilePage({
  onBackHome,
  onLogout,
}: {
  onBackHome: () => void;
  onLogout: () => void;
}) {
  const [isEdit, setIsEdit] = useState(false);

  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("/profile.png");

  const auth = getAuth(app);
  const db = getFirestore(app);

  // 🔥 LOAD DATA USER
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email || "");

        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          if (data.username) setUsername(data.username);
          if (data.image) setImage(data.image);
        }
      }
    });

    return () => unsub();
  }, []);

  // 🔥 UPLOAD FOTO → BASE64
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage("/profile.png");
  };

  // 🔥 SIMPAN KE FIRESTORE
  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(doc(db, "users", user.uid), {
      username,
      image,
    });

    setIsEdit(false);
  };

  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between px-10 py-4 bg-[#b7cdcc] rounded-full m-6 shadow-md"
      >
        <button onClick={onBackHome} className="text-lg">
          ←
        </button>

        <div className="text-gray-700">Profile</div>

        <div className="w-[40px]" />
      </motion.nav>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl text-center font-serif mt-4 mb-8"
      >
        Profil
      </motion.h1>

      <div className="flex items-center justify-center gap-20 px-16">

        {/* FOTO */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="relative"
        >
          <div className="w-[230px] h-[230px] rounded-full overflow-hidden bg-gray-300 shadow-lg ring-4 ring-white relative">
            <Image
              src={image}
              alt="profile"
              fill
              className="object-cover object-center"
            />
          </div>

          {isEdit && (
            <>
              <label className="absolute bottom-2 right-2 bg-white p-3 rounded-full shadow cursor-pointer">
                <FaEdit size={14} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
              >
                Hapus
              </button>
            </>
          )}
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg w-[420px]"
        >

          <input
            type="text"
            value={username}
            disabled={!isEdit}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-5 p-4 rounded-xl bg-[#c7d9d8]"
          />

          <input
            type="email"
            value={email}
            disabled
            className="w-full mb-6 p-4 rounded-xl bg-[#c7d9d8]"
          />

          <div className="flex justify-end gap-3">

            {isEdit ? (
              <>
                <button
                  onClick={() => setIsEdit(false)}
                  className="bg-gray-200 px-4 py-2 rounded-full"
                >
                  Batal
                </button>

                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-6 py-2 rounded-full"
                >
                  Simpan
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-[#c7d9d8] px-5 py-2 rounded-full"
                >
                  Edit
                </button>

                <button
                  onClick={onLogout}
                  className="bg-[#e5e5e5] px-6 py-2 rounded-full shadow"
                >
                  LOGOUT →
                </button>
              </>
            )}

          </div>

        </motion.div>

      </div>

    </main>
  );
}