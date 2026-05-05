"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaShoppingCart, FaUser } from "react-icons/fa";

export default function ProdukPage({
  onBackHome,
  onSelectProduk,
  onTentangClick,
  onKeunggulanClick,
  onCartClick,
  onProfileClick,
  isAdmin,
  onAdminClick,
}: any) {

  const products = [
    {
      id: 1,
      name: "Standing Pouch",
      price: 20000,
      image: "/images/pouch1.png",
      stock: 100,
    },
    {
      id: 2,
      name: "Pouch Kopi",
      price: 25000,
      image: "/images/pouch2.png",
      stock: 80,
    },
    {
      id: 3,
      name: "Snack Pouch",
      price: 18000,
      image: "/images/pouch3.png",
      stock: 120,
    },
  ];

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col items-center overflow-hidden">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between px-10 py-4 bg-[#b7cdcc] rounded-full m-6 shadow-md w-full max-w-[1200px]"
      >
        <button onClick={onBackHome} className="text-lg font-brand">
          FlexiPouch.id
        </button>

        <div className="flex gap-10">
          <button>Produk</button>
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

      {/* TITLE */}
      <div className="text-center mt-6">
        <h2 className="text-3xl font-serif">Produk Kami</h2>
        <p className="text-gray-600">
          Temukan desain custom terbaik anda disini!
        </p>
      </div>

      {/* LIST PRODUK */}
      <div className="flex gap-10 mt-10 flex-wrap justify-center">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.08 }}
            onClick={() => onSelectProduk(product)}
            className="bg-[#dbe7e6] p-6 rounded-2xl text-center cursor-pointer shadow-md w-[200px]"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={130}
              height={130}
              className="mx-auto"
            />

            <p className="mt-3 font-medium">{product.name}</p>

            <p className="font-semibold text-gray-800">
              Rp {formatRupiah(product.price)}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Stok: {product.stock}
            </p>
          </motion.div>
        ))}
      </div>

    </main>
  );
}