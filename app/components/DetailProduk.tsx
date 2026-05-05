"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

export default function DetailProduk({
  onBackProduk,
  onCartClick,
  addToCart,
  product,
}: any) {

  //  FORMAT RUPIAH
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const phone = "628123456789";
  const instagram = "https://instagram.com/flexipouch.id";

  const message = encodeURIComponent(
    `Halo, saya tertarik dengan produk ${product?.name}`
  );

  //  ANTICRASH
  if (!product) return null;

  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col overflow-hidden">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-10 py-4 bg-[#b7cdcc] rounded-full m-6 shadow-md"
      >
        <button
          onClick={onBackProduk}
          className="text-lg hover:scale-110 transition"
        >
          ←
        </button>

        <div className="text-gray-700 font-medium">
          Detail Produk
        </div>

        <button
          onClick={onCartClick}
          className="bg-white p-2 rounded-full hover:scale-110 transition shadow"
        >
          <FaShoppingCart className="text-gray-700" />
        </button>
      </motion.nav>

      {/* CONTENT */}
      <div className="flex items-center justify-center gap-20 px-16 mt-10">

        {/*  IMAGE (FIX: TANPA BACKGROUND APAPUN) */}
        <motion.div
          initial={{ x: -80, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Image
              src={product.image}
              alt={product.name}
              width={320}
              height={320}
              priority
              className="object-contain"
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
          className="max-w-md"
        >
          {/* TITLE */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-3xl font-semibold mb-2"
          >
            {product.name}
          </motion.h1>

          {/* RATING */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="flex items-center gap-2 text-yellow-500 mb-3"
          >
            ⭐⭐⭐⭐⭐
            <span className="text-gray-500 text-sm">(5.0)</span>
          </motion.div>

          {/* DESKRIPSI */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-gray-600 mb-4"
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
            className="grid grid-cols-2 gap-2 text-sm mb-6"
          >
            <p>✅ 100% original</p>
            <p>🚚 Pengiriman cepat</p>
            <p>⭐ Kualitas premium</p>
            <p>🔒 Harga terjangkau</p>
          </motion.div>

          {/* BUTTON */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="flex gap-3 mb-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
              }
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Beli via WhatsApp
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="bg-white px-4 py-2 rounded-lg shadow"
            >
              Tambah ke keranjang
            </motion.button>
          </motion.div>

          {/* SHARE */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="flex gap-3 text-sm"
          >
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(product.name)}`,
                  "_blank"
                )
              }
              className="bg-white px-3 py-2 rounded-lg shadow"
            >
              Share WhatsApp
            </button>

            <button
              onClick={() => window.open(instagram, "_blank")}
              className="bg-white px-3 py-2 rounded-lg shadow"
            >
              DM Instagram
            </button>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}