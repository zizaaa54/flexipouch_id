"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import {
  FaBars,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

export default function CartPage({
  cart,
  onBackHome,
  onRemoveSelected,
  onCheckout,
}: {
  cart: any[];
  onBackHome: () => void;
  onRemoveSelected: (selectedIndexes: number[]) => void;
  onCheckout: (selectedIndexes: number[]) => void;
}) {

  const [selectMode, setSelectMode] = useState(false);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // mobile menu
  const [showMenu, setShowMenu] = useState(false);

  const toggleSelect = (index: number) => {

    if (selectedItems.includes(index)) {

      setSelectedItems(
        selectedItems.filter((i) => i !== index)
      );

    } else {

      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleCancel = () => {

    setSelectedItems([]);

    setSelectMode(false);
  };

  const handleDelete = () => {

    if (selectedItems.length === 0) return;

    onRemoveSelected(selectedItems);

    setSelectedItems([]);

    setSelectMode(false);
  };

  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col overflow-x-hidden px-4 md:px-0">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
        <button onClick={onBackHome}>
          ←
        </button>

        {/* TITLE DESKTOP */}
        <div className="hidden md:block">
          Keranjang
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:block w-[40px]" />

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden text-xl"
        >
          <FaBars />
        </button>

        {/* MOBILE MENU */}
        {showMenu && (
          <div className="absolute top-20 left-0 w-full bg-white rounded-3xl shadow-lg p-5 flex flex-col gap-4 md:hidden z-50 text-center">

            {!selectMode ? (

              <button
                onClick={() => {
                  setSelectMode(true);
                  setShowMenu(false);
                }}
              >
                Pilih Produk
              </button>

            ) : (

              <>
                <button
                  onClick={handleCancel}
                  className="text-gray-600"
                >
                  Batal
                </button>

                <button
                  onClick={handleDelete}
                  disabled={selectedItems.length === 0}
                  className={`${
                    selectedItems.length === 0
                      ? "text-gray-400"
                      : "text-red-600"
                  }`}
                >
                  Hapus
                </button>

                <button
                  onClick={() => onCheckout(selectedItems)}
                  disabled={selectedItems.length === 0}
                  className={`${
                    selectedItems.length === 0
                      ? "text-gray-400"
                      : "text-green-600"
                  }`}
                >
                  Checkout
                </button>
              </>
            )}

          </div>
        )}

      </motion.nav>

      <div className="px-4 md:px-16 mt-6 md:mt-10 pb-20">

        {/* HEADER */}
        <div className="hidden md:flex justify-between items-center mb-6">

          <h2 className="text-3xl">
            Keranjang
          </h2>

          <AnimatePresence mode="wait">

            {!selectMode ? (

              <motion.button
                key="pilih"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectMode(true)}
                className="text-gray-700 hover:underline"
              >
                Pilih
              </motion.button>

            ) : (

              <motion.div
                key="actions"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="flex gap-5"
              >

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleCancel}
                  className="text-gray-600 hover:underline"
                >
                  Batal
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleDelete}
                  disabled={selectedItems.length === 0}
                  className={`${
                    selectedItems.length === 0
                      ? "text-gray-400"
                      : "text-red-600"
                  } hover:underline`}
                >
                  Hapus
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onCheckout(selectedItems)}
                  disabled={selectedItems.length === 0}
                  className={`${
                    selectedItems.length === 0
                      ? "text-gray-400"
                      : "text-green-600"
                  } hover:underline`}
                >
                  Checkout
                </motion.button>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* EMPTY */}
        {cart.length === 0 ? (

          <p className="text-gray-600 text-center md:text-left">
            Keranjang kosong
          </p>

        ) : (

          <div className="flex flex-col gap-4">

            <AnimatePresence>

              {cart.map((item, index) => (

                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    x: -100,
                    transition: { duration: 0.25 },
                  }}
                  className="
                    bg-white
                    p-4
                    rounded-2xl
                    shadow
                    flex flex-col md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                  "
                >

                  <div className="flex items-center gap-4">

                    {/* CHECKBOX */}
                    <AnimatePresence>

                      {selectMode && (

                        <motion.input
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          type="checkbox"
                          checked={selectedItems.includes(index)}
                          onChange={() => toggleSelect(index)}
                          className="w-5 h-5"
                        />
                      )}

                    </AnimatePresence>

                    {/* IMAGE */}
                    <Image
                      src={item.image}
                      alt=""
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />

                    {/* DETAIL */}
                    <div>

                      <p className="font-medium text-sm md:text-base">
                        {item.name}
                      </p>

                      <p className="text-gray-600 text-sm">
                        Rp {item.price}
                      </p>

                    </div>

                  </div>

                  {/* MOBILE ACTION */}
                  {selectMode && (
                    <div className="flex md:hidden gap-3 justify-end">

                      <button
                        onClick={() => toggleSelect(index)}
                        className={`
                          p-2 rounded-full
                          ${
                            selectedItems.includes(index)
                              ? "bg-green-500 text-white"
                              : "bg-gray-200"
                          }
                        `}
                      >
                        <FaCheck />
                      </button>

                    </div>
                  )}

                </motion.div>

              ))}

            </AnimatePresence>

          </div>
        )}

      </div>

      {/* MOBILE BOTTOM ACTION */}
      {selectMode && (
        <div
          className="
            md:hidden
            fixed bottom-0 left-0
            w-full
            bg-white
            shadow-[0_-2px_10px_rgba(0,0,0,0.1)]
            p-4
            flex justify-between items-center
            z-50
          "
        >

          <button
            onClick={handleDelete}
            disabled={selectedItems.length === 0}
            className={`
              flex items-center gap-2
              px-4 py-3 rounded-xl
              ${
                selectedItems.length === 0
                  ? "bg-gray-200 text-gray-400"
                  : "bg-red-500 text-white"
              }
            `}
          >
            <FaTrash />
            Hapus
          </button>

          <button
            onClick={() => onCheckout(selectedItems)}
            disabled={selectedItems.length === 0}
            className={`
              px-5 py-3 rounded-xl
              ${
                selectedItems.length === 0
                  ? "bg-gray-200 text-gray-400"
                  : "bg-green-500 text-white"
              }
            `}
          >
            Checkout
          </button>

        </div>
      )}

    </main>
  );
}