"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  FaShoppingCart,
  FaStar,
  FaCheckCircle,
  FaTruck,
  FaGem,
  FaLock,
  FaWhatsapp,
  FaInstagram,
  FaBars,
} from "react-icons/fa";

import { useState } from "react";

export default function DetailProduk({
  onBackProduk,
  onCartClick,
  addToCart,
  product,
}: any) {

  // MOBILE MENU
  const [showMenu, setShowMenu] = useState(false);

  // FORMAT RUPIAH
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const phone = "628123456789";
  const instagram = "https://instagram.com/flexipouch.id";

  const message = encodeURIComponent(
    `Halo, saya tertarik dengan produk ${product?.name}`
  );

  if (!product) return null;

  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col overflow-x-hidden px-4 md:px-0">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          flex items-center justify-between
          px-5 md:px-10
          py-4
          bg-[#b7cdcc]
          rounded-full
          mt-4 md:m-6
          shadow-md
          relative
        "
      >

        {/* BACK */}
        <button
          onClick={onBackProduk}
          className="text-lg hover:scale-110 transition"
        >
          ←
        </button>

        {/* DESKTOP TITLE */}
        <div className="hidden md:block text-gray-700 font-medium">
          Detail Produk
        </div>

        {/* DESKTOP CART */}
        <button
          onClick={onCartClick}
          className="hidden md:flex bg-white p-2 rounded-full hover:scale-110 transition shadow"
        >
          <FaShoppingCart className="text-gray-700" />
        </button>

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

            <button
              onClick={onCartClick}
              className="bg-[#c7d9d8] p-3 rounded-full flex items-center justify-center gap-2"
            >
              <FaShoppingCart />
              <span>Keranjang</span>
            </button>

          </div>
        )}

      </motion.nav>

      {/* CONTENT */}
      <div
        className="
          flex flex-col md:flex-row
          items-center justify-center
          gap-10 md:gap-20
          px-4 md:px-16
          py-10
        "
      >

        {/* IMAGE */}
        <motion.div
          initial={{ x: -80, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-auto flex justify-center"
        >

          <motion.div whileHover={{ scale: 1.05 }}>

            <Image
              src={product.image}
              alt={product.name}
              width={320}
              height={320}
              priority
              className="
                object-contain
                w-[230px]
                sm:w-[280px]
                md:w-[320px]
                h-auto
              "
            />

          </motion.div>

        </motion.div>

        {/* DETAIL */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="
            w-full
            max-w-md
            text-center md:text-left
          "
        >

          {/* TITLE */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-2xl md:text-3xl font-semibold mb-2"
          >
            {product.name}
          </motion.h1>

          {/* RATING */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="
              flex items-center justify-center md:justify-start
              gap-2 text-yellow-500 mb-3
            "
          >

            <div className="flex gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <span className="text-gray-500 text-sm">
              (5.0)
            </span>

          </motion.div>

          {/* DESKRIPSI */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-gray-600 mb-4 text-sm md:text-base"
          >
            Produk custom berkualitas tinggi, cocok untuk usaha kamu agar tampil
            lebih menarik dan profesional.
          </motion.p>

          {/* HARGA */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-2xl font-bold mb-2 text-gray-800"
          >
            Rp {formatRupiah(product.price)}
          </motion.h2>

          {/* STOCK */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-sm mb-4"
          >
            Stock{" "}

            <span className="bg-gray-200 px-2 py-1 rounded">
              {product.stock || 100} tersedia
            </span>
          </motion.p>

          {/* BENEFIT */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="
              grid grid-cols-1 sm:grid-cols-2
              gap-3
              text-sm
              mb-6
            "
          >

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <FaCheckCircle className="text-green-500" />
              <p>100% Original</p>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <FaTruck className="text-blue-500" />
              <p>Pengiriman Cepat</p>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <FaGem className="text-purple-500" />
              <p>Kualitas Premium</p>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <FaLock className="text-gray-600" />
              <p>Harga Terjangkau</p>
            </div>

          </motion.div>

          {/* BUTTON */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="
              flex flex-col sm:flex-row
              gap-3
              mb-4
            "
          >

            {/* WHATSAPP */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open(
                  `https://wa.me/${phone}?text=${message}`,
                  "_blank"
                )
              }
              className="bg-green-500 text-white px-4 py-3 rounded-lg"
            >

              <div className="flex items-center justify-center gap-2">
                <FaWhatsapp />
                <span>Beli via WhatsApp</span>
              </div>

            </motion.button>

            {/* CART */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="bg-white px-4 py-3 rounded-lg shadow"
            >

              <div className="flex items-center justify-center gap-2">
                <FaShoppingCart />
                <span>Tambah ke Keranjang</span>
              </div>

            </motion.button>

          </motion.div>

          {/* SHARE */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="
              flex flex-col sm:flex-row
              gap-3
              text-sm
            "
          >

            {/* SHARE WA */}
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(product.name)}`,
                  "_blank"
                )
              }
              className="bg-white px-3 py-3 rounded-lg shadow"
            >

              <div className="flex items-center justify-center gap-2">
                <FaWhatsapp className="text-green-500" />
                <span>Share WhatsApp</span>
              </div>

            </button>

            {/* INSTAGRAM */}
            <button
              onClick={() => window.open(instagram, "_blank")}
              className="bg-white px-3 py-3 rounded-lg shadow"
            >

              <div className="flex items-center justify-center gap-2">
                <FaInstagram className="text-pink-500" />
                <span>DM Instagram</span>
              </div>

            </button>

          </motion.div>

        </motion.div>

      </div>

    </main>
  );
}