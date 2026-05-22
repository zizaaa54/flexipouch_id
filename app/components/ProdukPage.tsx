"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
} from "react-icons/fa";

import { useEffect, useState } from "react";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import app from "../firebase";

export default function ProdukPage({
  onBackHome,
  onSelectProduk,
  onTentangClick,
  onKeunggulanClick,
  onCartClick,
  onProfileClick,
  isAdmin,
}: any) {

  const db = getFirestore(app);

  // state
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");


  const [editId, setEditId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // mobile menu
  const [showMenu, setShowMenu] = useState(false);

  // format rupiah
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  // fetch produk
  const fetchProducts = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "products")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);

    } catch (error) {

      console.log(error);

      alert("Gagal mengambil data produk");
    }
  };

  // load data
  useEffect(() => {
    fetchProducts();
  }, []);

  // reset form
  const resetForm = () => {

    setName("");
    setPrice("");
    setStock("");


    setEditId(null);

    setShowForm(false);
  };

  // save produk
  const handleSave = async () => {

    if (!name || !price || !stock) {
      alert("Semua data wajib diisi!");
      return;
    }

    try {

      setLoading(true);

      // update
      if (editId) {

        await updateDoc(doc(db, "products", editId), {
          name: name,
          price: Number(price),
          stock: Number(stock),

          image: "/images/katalog1.jpeg",
        });

        alert("Produk berhasil diupdate!");

      } else {

        // add
        await addDoc(collection(db, "products"), {
          name: name,
          price: Number(price),
          stock: Number(stock),

          image: "/images/katalog1.jpeg",
        });

        alert("Produk berhasil ditambahkan!");
      }

      // refresh
      await fetchProducts();

      // reset
      resetForm();

    } catch (error) {

      console.log(error);

      alert("Gagal menyimpan produk!");

    } finally {

      setLoading(false);
    }
  };

  // delete
  const handleDelete = async (id: string) => {

    const confirmDelete = confirm(
      "Yakin ingin menghapus produk?"
    );

    if (!confirmDelete) return;

    try {

      await deleteDoc(doc(db, "products", id));

      await fetchProducts();

      alert("Produk berhasil dihapus!");

    } catch (error) {

      console.log(error);

      alert("Gagal menghapus produk!");
    }
  };

  // edit
  const handleEdit = (product: any) => {

    setName(product.name);

    setPrice(product.price.toString());

    setStock(product.stock.toString());



    setEditId(product.id);

    setShowForm(true);
  };

  return (
    <main className="min-h-screen bg-[#c7d9d8] flex flex-col overflow-x-hidden px-4">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="
          flex items-center justify-between
          px-5 md:px-10
          py-4
          bg-[#b7cdcc]
          rounded-full
          mt-4
          shadow-md
          w-full
          max-w-[1200px]
          mx-auto
          relative
        "
      >

        {/* LOGO */}
        <button
          onClick={onBackHome}
          className="text-lg md:text-xl font-brand"
        >
          FlexiPouch.id
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10 text-gray-700">

          <button>
            Produk
          </button>

          <button onClick={onTentangClick}>
            Tentang
          </button>

          <button onClick={onKeunggulanClick}>
            Keunggulan
          </button>

        </div>

        {/* DESKTOP ICON */}
        <div className="hidden md:flex gap-3">

          <button
            onClick={onCartClick}
            className="bg-white p-2 rounded-full shadow"
          >
            <FaShoppingCart />
          </button>

          <button
            onClick={onProfileClick}
            className="bg-white p-2 rounded-full shadow"
          >
            <FaUser />
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

            <button onClick={onSelectProduk}>
              Produk
            </button>

            <button onClick={onTentangClick}>
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

      {/* BUTTON ADMIN */}
      {isAdmin && (
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="
            fixed bottom-5 right-5 md:left-6 md:right-auto
            bg-black text-white
            px-5 py-3
            rounded-xl
            shadow-lg
            z-50
          "
        >
          + Tambah Produk
        </button>
      )}

      {/* FORM */}
      {showForm && isAdmin && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-[380px]">

            <h2 className="text-2xl font-bold mb-4">
              {editId ? "Edit Produk" : "Tambah Produk"}
            </h2>

            {/* NAMA */}
            <input
              type="text"
              placeholder="Nama Produk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-lg mb-3"
            />

            {/* HARGA */}
            <input
              type="number"
              placeholder="Harga"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-3 rounded-lg mb-3"
            />

            {/* STOCK */}
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border p-3 rounded-lg mb-3"
            />

            

            {/* BUTTON */}
            <div className="flex gap-3">

              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-black text-white px-4 py-3 rounded-lg w-full"
              >
                {loading
                  ? "Loading..."
                  : editId
                  ? "Update"
                  : "Simpan"}
              </button>

              <button
                onClick={resetForm}
                className="bg-gray-300 px-4 py-3 rounded-lg w-full"
              >
                Batal
              </button>

            </div>

          </div>

        </div>
      )}

      {/* TITLE */}
      <div className="text-center mt-8 px-4">

        <h2 className="text-3xl font-serif">
          Produk Kami
        </h2>

        <p className="text-gray-600 mt-2">
          Temukan desain custom terbaik anda disini!
        </p>

      </div>

      {/* LIST PRODUK */}
      <div className="flex gap-6 md:gap-10 mt-10 flex-wrap justify-center pb-24 w-full">

        {products.map((product) => (

          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="
              bg-[#dbe7e6]
              p-5
              rounded-2xl
              text-center
              shadow-md
              w-[160px]
              sm:w-[200px]
              md:w-[220px]
              relative
            "
          >

            {/* ADMIN ACTION */}
            {isAdmin && (

              <div className="absolute top-3 right-3 flex gap-2">

                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  Hapus
                </button>

              </div>
            )}

            {/* CARD */}
            <div
              onClick={() => onSelectProduk(product)}
              className="cursor-pointer"
            >

              <Image
                src={product.image || "/images/katalog1.jpeg"}
                alt={product.name}
                width={130}
                height={130}
                className="mx-auto object-contain h-[110px] md:h-[130px]"
              />

              <p className="mt-3 font-medium">
                {product.name}
              </p>

              <p className="font-semibold text-gray-800">
                Rp {formatRupiah(product.price)}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Stok: {product.stock}
              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </main>
  );
}