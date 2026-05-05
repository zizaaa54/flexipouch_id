"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../firebase";

export default function CheckoutPage({
  items,
  onBackCart,
  onOrderSuccess,
}: {
  items: any[];
  onBackCart: () => void;
  onOrderSuccess: () => void;
}) {
  const [buyerName, setBuyerName] = useState("Nur Azizah");
  const [buyerAddress, setBuyerAddress] = useState(
    "Jl. Contoh No.123 Jakarta Selatan"
  );
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // METODE PEMBAYARAN
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank");

  const paymentOptions = [
    "Transfer Bank",
    "COD (Bayar di Tempat)",
    "E-Wallet (Dana / OVO / Gopay)",
  ];

  // QTY
  const [quantities, setQuantities] = useState(
    items.map(() => 1)
  );

  const increaseQty = (index: number) => {
    const updated = [...quantities];
    updated[index] += 1;
    setQuantities(updated);
  };

  const decreaseQty = (index: number) => {
    const updated = [...quantities];
    if (updated[index] > 1) {
      updated[index] -= 1;
      setQuantities(updated);
    }
  };

  // TOTAL
  const subtotal = items.reduce(
    (sum, item, index) =>
      sum + Number(item.price) * quantities[index],
    0
  );

  // 🔥 FUNGSI UNTUK MENDAPATKAN NOMOR PEMBAYARAN
  const getPaymentNumber = () => {
    if (paymentMethod === "E-Wallet (Dana / OVO / Gopay)") {
      return {
        dana: "085704936159",
        ovo: "085704936159",
        gopay: "085708780669",
      };
    }
    return null;
  };

  // 🔥 OPEN MODAL SEBELUM ORDER
  const handleOpenPayment = () => {
    setShowPaymentModal(true);
  };

  // 🔥 ORDER SETELAH KONFIRMASI PEMBAYARAN
  const handleOrder = async () => {
    const user = auth.currentUser;

    const orderData = {
      buyerName,
      buyerAddress,
      note,
      paymentMethod,
      items: items.map((item, index) => ({
        ...item,
        qty: quantities[index],
      })),
      total: subtotal,
      userId: user?.uid || null,
      createdAt: new Date(),
      status: "menunggu_pembayaran",
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      console.log("MASUK FIRESTORE:", orderData);
      setShowPaymentModal(false);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Gagal simpan pesanan");
    }
  };

  // PDF STRUK (ALFAMART STYLE)
  const handlePrint = () => {
    const doc = new jsPDF({
      unit: "mm",
      format: [80, 200],
    });

    let y = 5;

    doc.setFont("courier", "bold");
    doc.setFontSize(10);
    doc.text("FLEXIPOUCH.ID", 40, y, { align: "center" });
    y += 4;

    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.text("Custom Pouch Kekinian", 40, y, { align: "center" });
    y += 4;

    doc.text("================================", 40, y, { align: "center" });
    y += 4;

    const date = new Date().toLocaleString();

    doc.text(`Tanggal : ${date}`, 5, y);
    y += 4;

    doc.text(`Nama    : ${buyerName}`, 5, y);
    y += 4;

    doc.text(`Alamat  : ${buyerAddress}`, 5, y);
    y += 4;

    doc.text(`Metode  : ${paymentMethod}`, 5, y);
    y += 4;

    doc.text("--------------------------------", 40, y, { align: "center" });
    y += 4;

    doc.text("Item", 5, y);
    doc.text("Qty", 45, y);
    doc.text("Total", 60, y);
    y += 3;

    doc.text("--------------------------------", 40, y, { align: "center" });
    y += 4;

    items.forEach((item, index) => {
      const qty = quantities[index];
      const totalItem = Number(item.price) * qty;

      const name = item.name.substring(0, 20);

      doc.text(name, 5, y);
      y += 4;

      doc.text(`${qty} x ${item.price}`, 5, y);
      doc.text(`${totalItem}`, 60, y);
      y += 4;
    });

    doc.text("--------------------------------", 40, y, { align: "center" });
    y += 4;

    doc.setFont("courier", "bold");
    doc.text("TOTAL", 5, y);
    doc.text(`Rp ${subtotal}`, 60, y);
    y += 5;

    doc.setFont("courier", "normal");

    doc.text("--------------------------------", 40, y, { align: "center" });
    y += 4;

    if (note) {
      doc.text("Catatan:", 5, y);
      y += 4;

      const splitNote = doc.splitTextToSize(note, 70);
      doc.text(splitNote, 5, y);
      y += splitNote.length * 4;
    }

    y += 4;

    doc.text("Terima kasih telah berbelanja", 40, y, { align: "center" });
    y += 4;

    doc.text("di Flexipouch.id", 40, y, { align: "center" });

    doc.save("struk-flexipouch.pdf");
  };

  // BACK (hapus cart)
  const handleBack = () => {
    setSuccess(false);
    onOrderSuccess();
  };

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm px-8 py-5 flex justify-between items-center"
      >
        <button onClick={onBackCart}>←</button>
        <h1 className="font-semibold">Checkout</h1>
        <div className="w-6" />
      </motion.nav>

      <div className="max-w-3xl mx-auto py-8 space-y-5">

        {/* DETAIL PEMBELI */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Detail Pembeli</h2>

          <input
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            placeholder="Nama"
            className="w-full bg-gray-100 p-3 rounded-lg mb-3 outline-none"
          />

          <textarea
            value={buyerAddress}
            onChange={(e) => setBuyerAddress(e.target.value)}
            placeholder="Alamat"
            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
          />
        </div>

        {/* PRODUK */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Produk</h2>

          {items.map((item, index) => (
            <div key={index} className="mb-5 border-b pb-4">

              <div className="flex justify-between">
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Rp {item.price}
                  </p>
                </div>

                <p className="font-semibold">
                  Rp {Number(item.price) * quantities[index]}
                </p>
              </div>

              <div className="flex gap-3 mt-2 items-center">
                <button
                  onClick={() => decreaseQty(index)}
                  className="w-8 h-8 bg-gray-200 rounded-full"
                >
                  -
                </button>

                <span>{quantities[index]}</span>

                <button
                  onClick={() => increaseQty(index)}
                  className="w-8 h-8 bg-gray-200 rounded-full"
                >
                  +
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* METODE PEMBAYARAN */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Metode Pembayaran</h2>

          <div className="space-y-2">
            {paymentOptions.map((method, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* CATATAN */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Catatan</h2>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
          />
        </div>

        {/* TOTAL */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rp {subtotal}</span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleOpenPayment}
          className="w-full bg-[#8FAEB0] text-white py-4 rounded-xl"
        >
          Buat Pesanan
        </button>

      </div>

      {/* 🔥 MODAL PEMBAYARAN */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
              Detail Pembayaran
            </h2>

            <p className="text-center text-gray-600 mb-4">
              Silakan transfer ke nomor berikut:
            </p>

            {/* 🔥 TRANSFER BANK - NOMOR SUDAH DIUBAH */}
            {paymentMethod === "Transfer Bank" && (
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="font-semibold">Bank BCA</p>
                <p className="text-lg font-mono">0852-1096-5479</p>
                <p className="text-sm">a.n FlexiPouch.id</p>
                <button
                  onClick={() => navigator.clipboard.writeText("085210965479")}
                  className="text-xs bg-gray-500 text-white px-2 py-1 rounded mt-2"
                >
                  Salin Nomor
                </button>
              </div>
            )}

            {/* E-WALLET */}
            {paymentMethod === "E-Wallet (Dana / OVO / Gopay)" && (
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-600">DANA / OVO</p>
                  <p className="text-lg font-mono">0857-0493-6159</p>
                  <button
                    onClick={() => navigator.clipboard.writeText("085704936159")}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded mt-1"
                  >
                    Salin Nomor
                  </button>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-semibold text-green-600">GoPay</p>
                  <p className="text-lg font-mono">0857-0878-0669</p>
                  <button
                    onClick={() => navigator.clipboard.writeText("085708780669")}
                    className="text-xs bg-green-500 text-white px-2 py-1 rounded mt-1"
                  >
                    Salin Nomor
                  </button>
                </div>
              </div>
            )}

            {/* COD */}
            {paymentMethod === "COD (Bayar di Tempat)" && (
              <div className="bg-yellow-50 p-4 rounded-lg mb-4 text-center">
                <p>Bayar langsung saat barang diterima</p>
              </div>
            )}

            <p className="text-center text-sm text-gray-500 my-4">
              Total Pembayaran: <span className="font-bold">Rp {subtotal}</span>
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 bg-gray-300 py-2 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleOrder}
                className="flex-1 bg-[#8FAEB0] text-white py-2 rounded-lg"
              >
                Saya Sudah Bayar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl text-center">

            <h2 className="text-xl mb-3">
              Pesanan Berhasil 
            </h2>

            <p className="mb-4">
              Metode: {paymentMethod}
            </p>

            <button
              onClick={handlePrint}
              className="bg-gray-200 px-4 py-2 rounded mr-2"
            >
              Cetak Struk
            </button>

            <button
              onClick={handleBack}
              className="bg-[#8FAEB0] text-white px-4 py-2 rounded"
            >
              Kembali
            </button>

          </div>
        </div>
      )}

    </main>
  );
}