"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CartPage({
  cart,
  onBackHome,
  onRemoveSelected,
  onCheckout,
}: {
  cart: any[];
  onBackHome: () => void;
  onRemoveSelected: (selectedIndexes: number[]) => void;
  onCheckout:(selectedIndexes:number[])=>void;
}) {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

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

    // benar-benar hapus
    onRemoveSelected(selectedItems);

    // reset mode pilih
    setSelectedItems([]);
    setSelectMode(false);
  };

  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between px-10 py-4 bg-[#b7cdcc] rounded-full m-6 shadow-md"
      >
        <button onClick={onBackHome}>←</button>

        <div>Keranjang</div>

        <div className="w-[40px]" />
      </motion.nav>

      <div className="px-16 mt-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

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
                initial={{ opacity:0, x:15 }}
                animate={{ opacity:1, x:0 }}
                exit={{ opacity:0, x:-15 }}
                transition={{ duration:0.25 }}
                className="flex gap-5"
              >
                <motion.button
                  whileTap={{ scale:0.92 }}
                  whileHover={{ scale:1.05 }}
                  onClick={handleCancel}
                  className="text-gray-600 hover:underline"
                >
                  Batal
                </motion.button>

                <motion.button
                  whileTap={{ scale:0.92 }}
                  whileHover={{ scale:1.05 }}
                  onClick={handleDelete}
                  disabled={selectedItems.length===0}
                  className={`${
                    selectedItems.length===0
                      ? "text-gray-400"
                      : "text-red-600"
                  } hover:underline`}
                >
                  Hapus
                </motion.button>

                <motion.button
                  whileTap={{ scale:0.92 }}
                  whileHover={{ scale:1.05 }}
                  onClick={()=>onCheckout (selectedItems)}
                  disabled={selectedItems.length===0}
                  className={`${
                    selectedItems.length===0
                      ? "text-gray-400"
                      : "text-red-600"
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
          <p className="text-gray-600">
            Keranjang kosong
          </p>
        ) : (
          <div className="flex flex-col gap-4">

            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity:0, y:20 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{
                    opacity:0,
                    x:-100,
                    transition:{ duration:0.25 }
                  }}
                  className="bg-white p-4 rounded-lg shadow flex items-center"
                >

                  <div className="flex items-center gap-4">

                    {/* checkbox muncul animasi */}
                    <AnimatePresence>
                      {selectMode && (
                        <motion.input
                          initial={{ opacity:0, scale:0 }}
                          animate={{ opacity:1, scale:1 }}
                          exit={{ opacity:0, scale:0 }}
                          type="checkbox"
                          checked={selectedItems.includes(index)}
                          onChange={() => toggleSelect(index)}
                          className="w-5 h-5"
                        />
                      )}
                    </AnimatePresence>

                    <Image
                      src={item.image}
                      alt=""
                      width={80}
                      height={80}
                      className="rounded-md"
                    />

                    <div>
                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="text-gray-600">
                        Rp {item.price}
                      </p>
                    </div>

                  </div>

                </motion.div>
              ))}
            </AnimatePresence>

          </div>
        )}

      </div>

    </main>
  );
}