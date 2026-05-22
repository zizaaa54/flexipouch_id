"use client";

import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaShoppingCart,
  FaUser,
  FaBars,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { SiTiktok } from "react-icons/si";

import { useState } from "react";

export default function KeunggulanPage({
  onBackHome,
  onProdukClick,
  onTentangClick,
  onCartClick,
  onProfileClick,
}: {
  onBackHome: () => void;
  onProdukClick: () => void;
  onTentangClick: () => void;
  onCartClick: () => void;
  onProfileClick: () => void;
}) {

  const phone = "628123456789";
  const email = "flexipouch.id@gmail.com";
  const instagram = "https://instagram.com/username_kamu";
  const tiktok = "https://www.tiktok.com/@flexipouch.id";

  const message = encodeURIComponent(
    "Halo, saya tertarik dengan FlexiPouch.id"
  );

  // MOBILE MENU
  const [showMenu, setShowMenu] = useState(false);

  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col overflow-x-hidden px-4">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
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

          <button
            onClick={onTentangClick}
            className="hover:scale-105 transition"
          >
            Tentang
          </button>

          <button className="hover:scale-105 transition">
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

            <button onClick={onTentangClick}>
              Tentang
            </button>

            <button>
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

      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-10 px-4"
      >

        <h1 className="text-3xl md:text-5xl font-serif leading-snug">
          Kenapa Memilih{" "}
          <span className="italic">
            Flexipouch.id
          </span>
          ?
        </h1>

        <p className="text-gray-700 mt-2 text-sm md:text-base">
          Keunggulan kami dalam desain custom pouch.
        </p>

      </motion.div>

      {/* CARD */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center mt-8 px-4"
      >

        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-[450px] text-left">

          <h3 className="font-semibold mb-3 text-lg">
            Keunggulan Kami :
          </h3>

          <ul className="list-disc pl-5 space-y-2 text-gray-800 text-sm md:text-base">
            <li>Desain kemasan modern dan menarik</li>
            <li>Praktis dan ringan untuk dibawa atau disimpan</li>
            <li>Resealable (bisa dibuka tutup kembali)</li>
            <li>Harga yang terjangkau</li>
          </ul>

        </div>

      </motion.div>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-[#e5e5e5] mt-16 py-10 px-6 md:px-10"
      >

        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* KIRI */}
          <div>

            <h2 className="italic mb-2 text-lg">
              Flexipouch.id
            </h2>

            <p className="text-sm max-w-xs leading-relaxed">
              Toko online desain custom pouch yang kekinian untuk para wirausaha.
              Kami menghadirkan produk terbaik dan layanan terbaik.
            </p>

          </div>

          {/* TENGAH */}
          <div>

            <h3 className="mb-2 font-medium">
              Navigasi
            </h3>

            <div className="flex flex-col gap-2">

              <p
                onClick={onBackHome}
                className="text-sm cursor-pointer hover:underline"
              >
                Beranda
              </p>

              <p
                onClick={onProdukClick}
                className="text-sm cursor-pointer hover:underline"
              >
                Produk
              </p>

              <p
                onClick={onTentangClick}
                className="text-sm cursor-pointer hover:underline"
              >
                Tentang kami
              </p>

              <p
                onClick={() =>
                  window.open(
                    `https://wa.me/${phone}?text=${message}`,
                    "_blank"
                  )
                }
                className="text-sm cursor-pointer hover:underline"
              >
                Kontak
              </p>

            </div>

          </div>

          {/* KANAN */}
          <div>

            <h3 className="mb-3 font-medium">
              Hubungi kami
            </h3>

            <div className="flex gap-4 text-xl">

              <motion.div whileHover={{ scale: 1.2 }}>
                <FaWhatsapp
                  className="cursor-pointer"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${phone}?text=${message}`,
                      "_blank"
                    )
                  }
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.2 }}>
                <MdEmail
                  className="cursor-pointer"
                  onClick={() =>
                    window.open(
                      `mailto:${email}?subject=FlexiPouch`
                    )
                  }
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.2 }}>
                <SiTiktok
                  className="cursor-pointer"
                  onClick={() =>
                    window.open(tiktok, "_blank")
                  }
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.2 }}>
                <FaInstagram
                  className="cursor-pointer"
                  onClick={() =>
                    window.open(instagram, "_blank")
                  }
                />
              </motion.div>

            </div>

          </div>

        </div>

        <p className="text-center text-sm mt-8">
          © 2026 flexipouch.id all rights reserved
        </p>

      </motion.footer>

    </main>
  );
}