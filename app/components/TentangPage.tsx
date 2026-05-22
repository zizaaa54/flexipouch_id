"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaShoppingCart,
  FaUser,
  FaBars,
} from "react-icons/fa";

import { useState } from "react";

export default function TentangPage({
  onBackHome,
  onProdukClick,
  onKeunggulanClick,
  onCartClick,
  onProfileClick,
}: {
  onBackHome: () => void;
  onProdukClick: () => void;
  onKeunggulanClick: () => void;
  onCartClick: () => void;
  onProfileClick: () => void;
}) {

  const phone = "628123456789";
  const email = "flexipouch.id@gmail.com";
  const instagram = "https://instagram.com/flexipouch.id";

  const message = encodeURIComponent(
    "Halo, saya tertarik dengan layanan FlexiPouch.id"
  );

  // MOBILE MENU
  const [showMenu, setShowMenu] = useState(false);

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
          className="text-lg md:text-xl font-brand hover:scale-105 transition"
        >
          FlexiPouch.id
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10">

          <button
            onClick={onProdukClick}
            className="hover:scale-105 transition"
          >
            Produk
          </button>

          <button className="hover:scale-105 transition">
            Tentang
          </button>

          <button
            onClick={onKeunggulanClick}
            className="hover:scale-105 transition"
          >
            Keunggulan
          </button>

        </div>

        {/* DESKTOP ICON */}
        <div className="hidden md:flex gap-3">

          <button
            onClick={onCartClick}
            className="bg-white p-2 rounded-full hover:scale-110 transition shadow"
          >
            <FaShoppingCart className="text-gray-700" size={16} />
          </button>

          <button
            onClick={onProfileClick}
            className="bg-white p-2 rounded-full hover:scale-110 transition shadow"
          >
            <FaUser className="text-gray-700" size={16} />
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

            <button>
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

      {/* CONTENT */}
      <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-10 gap-12 flex-1">

        {/* IMAGE */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={350}
              height={350}
              className="object-contain w-[230px] sm:w-[300px] md:w-[350px] h-auto"
            />
          </motion.div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-serif mb-4 leading-snug"
          >
            Tentang <span className="italic">FlexiPouch.id</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-700 mb-6 text-sm md:text-base"
          >
            Kami adalah solusi terbaik bagi para wirausaha yang membutuhkan desain
            kekinian menarik dan aesthetic, dengan produk custom sesuai kemauan
            customer, harga terjangkau dan siap membuat produk anda lebih menarik!
          </motion.p>

          {/* BUTTON */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open(
                  `https://wa.me/${phone}?text=${message}`,
                  "_blank"
                )
              }
              className="bg-white px-5 py-3 rounded-lg shadow flex items-center gap-2 text-sm md:text-base"
            >
              <FaWhatsapp className="text-green-500" />
              WhatsApp
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open(
                  `mailto:${email}?subject=FlexiPouch&body=${message}`
                )
              }
              className="bg-white px-5 py-3 rounded-lg shadow flex items-center gap-2 text-sm md:text-base"
            >
              <FaEnvelope className="text-gray-600" />
              Email
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(instagram, "_blank")}
              className="bg-white px-5 py-3 rounded-lg shadow flex items-center gap-2 text-sm md:text-base"
            >
              <FaInstagram className="text-pink-500" />
              Instagram
            </motion.button>

          </div>

        </motion.div>

      </section>

    </main>
  );
}