"use client";

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

export default function AdminPage({ onBackHome, onProductAdded }: any) {
  const db = getFirestore(app);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchProducts = async () => {
    const snap = await getDocs(collection(db, "products"));
    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async () => {
    if (!name || !price) return alert("Isi semua!");

    if (editId) {
      await updateDoc(doc(db, "products", editId), {
        name,
        price,
      });
      setEditId(null);
    } else {
      await addDoc(collection(db, "products"), {
        name,
        price,
      });
    }

    setName("");
    setPrice("");
    await fetchProducts();
    
    // 🔥 PANGGIL onProductAdded AGAR PRODUK PAGE UPDATE
    if (onProductAdded) {
      onProductAdded();
    }
  };

  const handleEdit = (product: any) => {
    setName(product.name);
    setPrice(product.price);
    setEditId(product.id);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    await fetchProducts();
    
    // 🔥 PANGGIL onProductAdded AGAR PRODUK PAGE UPDATE
    if (onProductAdded) {
      onProductAdded();
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gray-100">

      {/* 🔥 BUTTON KEMBALI */}
      <button
        onClick={onBackHome}
        className="mb-4 bg-black text-white px-4 py-2 rounded-lg"
      >
        ⬅ Kembali ke Home
      </button>

      <h1 className="text-2xl font-bold mb-6">
        Admin Produk 🔥
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <input
          placeholder="Nama Produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />

        <input
          placeholder="Harga"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 mr-2"
        />

        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Tambah"}
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-xl shadow">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-500">
                Rp {p.price}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}