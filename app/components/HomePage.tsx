"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaShoppingCart, FaUser } from "react-icons/fa";

export default function HomePage({
  onHomeClick,
  onProdukClick,
  onTentangClick,
  onKeunggulanClick,
  onCartClick,
  onProfileClick,
  isAdmin,          // 🔥 TAMBAH
  onAdminClick,     // 🔥 TAMBAH
}: {
  onHomeClick: () => void;
  onProdukClick: () => void;
  onTentangClick: () => void;
  onKeunggulanClick: () => void;
  onCartClick: () => void;
  onProfileClick: () => void;
  isAdmin: boolean;            // 🔥 TAMBAH
  onAdminClick: () => void;    // 🔥 TAMBAH
}) {
  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col overflow-hidden">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between px-10 py-4 bg-[#b7cdcc] rounded-full m-6 shadow-md"
      >
        <button onClick={onHomeClick} className="text-lg font-brand">
          FlexiPouch.id
        </button>

        <div className="flex gap-10 text-gray-700">
          <button onClick={onProdukClick}>Produk</button>
          <button onClick={onTentangClick}>Tentang</button>
          <button onClick={onKeunggulanClick}>Keunggulan</button>
        </div>

        <div className="flex gap-3">
          <button onClick={onCartClick} className="bg-white p-2 rounded-full">
            <FaShoppingCart />
          </button>

          <button onClick={onProfileClick} className="bg-white p-2 rounded-full">
            <FaUser />
          </button>
        </div>
      </motion.nav>

      {/* 🔥 BUTTON ADMIN */}
      {isAdmin && (
        <button
          onClick={onAdminClick}
          className="fixed bottom-6 left-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg"
        >
          ADMIN 🔥
        </button>
      )}

      {/* HERO */}
      <section className="flex flex-1 items-center justify-between px-16">

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-1/2 flex justify-center pl-10"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              width={300}
              height={300}
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-1/2"
        >
          <motion.h1 className="text-4xl font-serif mb-4">
            Selamat Datang di <br />
            <span className="italic">FlexiPouch.id</span>
          </motion.h1>

          <motion.p className="text-gray-600 mb-6">
            Temukan desain custom terbaik di FlexiPouch.id.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onProdukClick}
            className="bg-white px-6 py-3 rounded-lg shadow"
          >
            Jelajahi Produk
          </motion.button>
        </motion.div>

      </section>
    </main>
  );
}