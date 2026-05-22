"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
} from "react-icons/fa";

import { useState } from "react";

export default function HomePage({
  onHomeClick,
  onProdukClick,
  onTentangClick,
  onKeunggulanClick,
  onCartClick,
  onProfileClick,
}: {
  onHomeClick: () => void;
  onProdukClick: () => void;
  onTentangClick: () => void;
  onKeunggulanClick: () => void;
  onCartClick: () => void;
  onProfileClick: () => void;
}) {

  // mobile menu
  const [showMenu, setShowMenu] = useState(false);

  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col overflow-x-hidden px-4">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
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
          onClick={onHomeClick}
          className="text-lg md:text-xl font-brand"
        >
          FlexiPouch.id
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10 text-gray-700">

          <button onClick={onProdukClick}>
            Produk
          </button>

          <button onClick={onTentangClick}>
            Tentang
          </button>

          <button onClick={onKeunggulanClick}>
            Keunggulan
          </button>

        </div>

        {/* DESKTOP ICON */}
        <div className="hidden md:flex gap-3">

          <button
            onClick={onCartClick}
            className="bg-white p-2 rounded-full shadow"
          >
            <FaShoppingCart />
          </button>

          <button
            onClick={onProfileClick}
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
          <div className="absolute top-20 left-0 w-full bg-white rounded-3xl shadow-lg p-5 flex flex-col gap-4 md:hidden z-50 text-center">

            <button onClick={onProdukClick}>
              Produk
            </button>

            <button onClick={onTentangClick}>
              Tentang
            </button>

            <button onClick={onKeunggulanClick}>
              Keunggulan
            </button>

            <div className="flex justify-center gap-3 pt-2">

              <button
                onClick={onCartClick}
                className="bg-[#c7d9d8] p-3 rounded-full"
              >
                <FaShoppingCart />
              </button>

              <button
                onClick={onProfileClick}
                className="bg-[#c7d9d8] p-3 rounded-full"
              >
                <FaUser />
              </button>

            </div>

          </div>
        )}

      </motion.nav>

      {/* HERO */}
      <section className="flex flex-col md:flex-row flex-1 items-center justify-between px-4 md:px-16 py-10 gap-10">

        {/* IMAGE */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center order-1"
        >

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
          >

            <Image
              src="/images/logo.png"
              alt="logo"
              width={300}
              height={300}
              className="object-contain w-[220px] sm:w-[280px] md:w-[300px] h-auto"
            />

          </motion.div>

        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-center md:text-left order-2"
        >

          <motion.h1 className="text-3xl md:text-5xl font-serif mb-4 leading-snug">

            Selamat Datang di <br />

            <span className="italic">
              FlexiPouch.id
            </span>

          </motion.h1>

          <motion.p className="text-gray-600 mb-6 text-sm md:text-lg">

            Temukan desain custom terbaik di FlexiPouch.id.

          </motion.p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onProdukClick}
            className="bg-white px-6 py-3 rounded-lg shadow text-sm md:text-base"
          >
            Jelajahi Produk
          </motion.button>

        </motion.div>

      </section>

    </main>
  );
}