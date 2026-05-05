"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaInstagram, FaShoppingCart, FaUser } from "react-icons/fa";

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

  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col overflow-hidden">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-10 py-4 bg-[#b7cdcc] rounded-full m-6 shadow-md"
      >
        <button
          onClick={onBackHome}
          className="text-lg font-brand hover:scale-105 transition"
        >
          FlexiPouch.id
        </button>

        <div className="flex gap-10">
          <button onClick={onProdukClick} className="hover:scale-105 transition">
            Produk
          </button>
          <button className="hover:scale-105 transition">
            Tentang
          </button>
          <button onClick={onKeunggulanClick} className="hover:scale-105 transition">
            Keunggulan
          </button>
        </div>

        {/* 🔥 ICON UPDATED */}
        <div className="flex gap-3">
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
      </motion.nav>

      {/* CONTENT */}
      <section className="flex items-center justify-between px-16 mt-24">

        {/* TEXT */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-1/2"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-serif mb-4"
          >
            Tentang <span className="italic">FlexiPouch.id</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-700 mb-6"
          >
            Kami adalah solusi terbaik bagi para wirausaha yang membutuhkan desain
            kekinian menarik dan aesthetic, dengan produk custom sesuai kemauan
            customer, harga terjangkau dan siap membuat produk anda lebih menarik!
          </motion.p>

          {/* BUTTON */}
          <div className="flex gap-4">

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
              }
              className="bg-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
            >
              <FaWhatsapp className="text-green-500" />
              WhatsApp
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open(`mailto:${email}?subject=FlexiPouch&body=${message}`)
              }
              className="bg-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
            >
              <FaEnvelope className="text-gray-600" />
              Email
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(instagram, "_blank")}
              className="bg-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
            >
              <FaInstagram className="text-pink-500" />
              Instagram
            </motion.button>

          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-1/2 flex justify-center"
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
              className="object-contain"
            />
          </motion.div>
        </motion.div>

      </section>
    </main>
  );
}