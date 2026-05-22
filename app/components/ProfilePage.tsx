"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaBars } from "react-icons/fa";

import {
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import app from "../firebase";

export default function ProfilePage({
  onBackHome,
  onLogout,
}: {
  onBackHome: () => void;
  onLogout: () => void;
}) {

  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("/profile.png");

  // mobile menu
  const [showMenu, setShowMenu] = useState(false);

  const auth = getAuth(app);
  const db = getFirestore(app);

  // LOAD USER
  useEffect(() => {

    const unsub = onAuthStateChanged(auth, async (user) => {

      if (user) {

        setEmail(user.email || "");

        const ref = doc(db, "user", user.uid);

        const snap = await getDoc(ref);

        if (snap.exists()) {

          const data = snap.data();

          if (data.username) {
            setUsername(data.username);
          }

          if (data.image) {
            setImage(data.image);
          }
        }
      }
    });

    return () => unsub();

  }, [auth, db]);

  // CHANGE IMAGE
  const handleImageChange = (e: any) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  // REMOVE IMAGE
  const handleRemoveImage = () => {
    setImage("/profile.png");
  };

  // SAVE
  const handleSave = async () => {

    const user = auth.currentUser;

    if (!user) {

      alert("❌ User tidak ditemukan!");

      return;
    }

    setIsSaving(true);

    try {

      await setDoc(doc(db, "user", user.uid), {
        username,
        image,
        email: user.email,
      });

      alert("Profil berhasil disimpan!");

      setIsEdit(false);

    } catch (error: any) {

      alert("Gagal menyimpan: " + error.message);

      console.log(error);

    } finally {

      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col overflow-x-hidden px-4">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          flex items-center justify-between
          px-5 md:px-10
          py-4
          bg-[#b7cdcc]
          rounded-full
          mt-4
          shadow-md
          w-full
          relative
        "
      >

        {/* LOGO */}
        <button
          onClick={onBackHome}
          className="text-lg md:text-xl font-brand"
        >
          FlexiPouch.id
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10 text-gray-700">

          <button>
            Profile
          </button>

        </div>

        {/* DESKTOP ICON */}
        <div className="hidden md:flex gap-3">

          <button
            className="bg-white p-2 rounded-full shadow"
          >
            <FaShoppingCart />
          </button>

          <button
            className="bg-white p-2 rounded-full shadow"
          >
            <FaUser />
          </button>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden text-xl"
        >
          <FaBars />
        </button>

        {/* MOBILE MENU */}
        {showMenu && (

          <div className="
            absolute
            top-20
            left-0
            w-full
            bg-white
            rounded-3xl
            shadow-lg
            p-5
            flex
            flex-col
            gap-4
            md:hidden
            z-50
            text-center
          ">

            <button>
              Profile
            </button>

            <div className="flex justify-center gap-3 pt-2">

              <button
                className="bg-[#c7d9d8] p-3 rounded-full"
              >
                <FaShoppingCart />
              </button>

              <button
                className="bg-[#c7d9d8] p-3 rounded-full"
              >
                <FaUser />
              </button>

            </div>

          </div>
        )}

      </motion.nav>

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          text-3xl md:text-4xl
          text-center
          font-serif
          mt-8
          mb-8
        "
      >
        Profil
      </motion.h1>

      {/* CONTENT */}
      <div className="
        flex
        flex-col
        md:flex-row
        items-center
        justify-center
        gap-10 md:gap-20
        px-4 md:px-16
        pb-10
      ">

        {/* FOTO */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="relative"
        >

          <div className="
            w-[180px] h-[180px]
            md:w-[230px] md:h-[230px]
            rounded-full
            overflow-hidden
            bg-gray-300
            shadow-lg
            ring-4
            ring-white
            relative
          ">

            <Image
              src={image}
              alt="profile"
              fill
              className="object-cover object-center"
            />

          </div>

          {isEdit && (
            <>

              <label className="
                absolute
                bottom-2
                right-2
                bg-white
                p-3
                rounded-full
                shadow
                cursor-pointer
              ">

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
                className="
                  absolute
                  top-2
                  right-2
                  bg-red-500
                  text-white
                  px-2
                  py-1
                  text-xs
                  rounded-full
                "
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
          className="
            bg-white
            p-6 md:p-8
            rounded-2xl
            shadow-lg
            w-full
            max-w-[420px]
          "
        >

          {/* USERNAME */}
          <input
            type="text"
            value={username}
            disabled={!isEdit || isSaving}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full
              mb-5
              p-4
              rounded-xl
              bg-[#c7d9d8]
              disabled:opacity-50
            "
          />

          {/* EMAIL */}
          <input
            type="email"
            value={email}
            disabled
            className="
              w-full
              mb-6
              p-4
              rounded-xl
              bg-[#c7d9d8]
            "
          />

          {/* BUTTON */}
          <div className="
            flex
            flex-col sm:flex-row
            justify-end
            gap-3
          ">

            {isEdit ? (
              <>

                <button
                  onClick={() => {

                    setIsEdit(false);

                    const loadOriginal = async () => {

                      const user = auth.currentUser;

                      if (user) {

                        const ref = doc(
                          db,
                          "user",
                          user.uid
                        );

                        const snap = await getDoc(ref);

                        if (snap.exists()) {

                          const data = snap.data();

                          if (data.username) {
                            setUsername(data.username);
                          }

                          if (data.image) {
                            setImage(data.image);
                          }
                        }
                      }
                    };

                    loadOriginal();

                  }}
                  disabled={isSaving}
                  className="
                    bg-gray-200
                    px-4
                    py-2
                    rounded-full
                    w-full sm:w-auto
                  "
                >
                  Batal
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="
                    bg-green-500
                    text-white
                    px-6
                    py-2
                    rounded-full
                    disabled:opacity-50
                    w-full sm:w-auto
                  "
                >
                  {isSaving
                    ? "Menyimpan..."
                    : "Simpan"}
                </button>

              </>
            ) : (
              <>

                <button
                  onClick={() => setIsEdit(true)}
                  className="
                    bg-[#c7d9d8]
                    px-5
                    py-2
                    rounded-full
                    w-full sm:w-auto
                  "
                >
                  Edit
                </button>

                <button
                  onClick={onLogout}
                  className="
                    bg-[#e5e5e5]
                    px-6
                    py-2
                    rounded-full
                    shadow
                    w-full sm:w-auto
                  "
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