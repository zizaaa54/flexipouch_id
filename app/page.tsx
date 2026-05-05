"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "./firebase";
import { useState, useEffect } from "react";

import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import ProdukPage from "./components/ProdukPage";
import DetailProduk from "./components/DetailProduk";
import TentangPage from "./components/TentangPage";
import KeunggulanPage from "./components/KeunggulanPage";
import CartPage from "./components/CartPage";
import ProfilePage from "./components/ProfilePage";
import CheckoutPage from "./components/CheckoutPage";

// ADMIN
import AdminPage from "./admin/page";

export default function Page() {
  const [page, setPage] = useState("auth");
  const [cart, setCart] = useState<any[]>([]);
  const [showNotif, setShowNotif] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const [checkoutIndexes, setCheckoutIndexes] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const auth = getAuth(app);
  const db = getFirestore(app);

  // 🔥 CEK ADMIN (PAKAI UID)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setIsAdmin(data.role === "admin");
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.log(err);
        setIsAdmin(false);
      }
    });

    return () => unsub();
  }, []);

  // CART
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prev) => [...prev, product]);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2000);
  };

  const removeSelectedFromCart = (selectedIndexes: number[]) => {
    setCart((prev) =>
      prev.filter((_, index) => !selectedIndexes.includes(index))
    );
  };

  const handleSelectProduk = (product: any) => {
    setSelectedProduct(product);
    setPage("detail");
  };

  const handleCheckout = (selectedIndexes: number[]) => {
    const selectedProducts = cart.filter((_, index) =>
      selectedIndexes.includes(index)
    );

    setCheckoutItems(selectedProducts);
    setCheckoutIndexes(selectedIndexes);
    setPage("checkout");
  };

  const handleOrderSuccess = () => {
    setCart((prev) =>
      prev.filter((_, index) => !checkoutIndexes.includes(index))
    );
    setCheckoutIndexes([]);
    setPage("home");
  };

  const handleLogout = () => {
    setPage("auth");
  };

  return (
    <>
      {/* NOTIF */}
      {showNotif && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
          Produk berhasil ditambahkan 🛒
        </div>
      )}

      {/* 🔥 ADMIN BUTTON GLOBAL */}
      {isAdmin && page !== "admin" && (
        <button
          onClick={() => setPage("admin")}
          className="fixed bottom-6 left-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg"
        >
          ADMIN 🔥
        </button>
      )}

      {/* AUTH */}
      {page === "auth" && (
        <AuthPage onLogin={() => setPage("home")} />
      )}

      {/* HOME */}
      {page === "home" && (
        <HomePage
          isAdmin={isAdmin}
          onAdminClick={() => setPage("admin")}
          onHomeClick={() => setPage("home")}
          onProdukClick={() => setPage("produk")}
          onTentangClick={() => setPage("tentang")}
          onKeunggulanClick={() => setPage("keunggulan")}
          onCartClick={() => setPage("cart")}
          onProfileClick={() => setPage("profile")}
        />
      )}

      {/* PRODUK */}
      {page === "produk" && (
        <ProdukPage
          isAdmin={isAdmin}
          onAdminClick={() => setPage("admin")}
          onBackHome={() => setPage("home")}
          onSelectProduk={handleSelectProduk}
          onTentangClick={() => setPage("tentang")}
          onKeunggulanClick={() => setPage("keunggulan")}
          onCartClick={() => setPage("cart")}
          onProfileClick={() => setPage("profile")}
        />
      )}

      {/* DETAIL */}
      {page === "detail" && (
        <DetailProduk
          product={selectedProduct}
          onBackProduk={() => setPage("produk")}
          onCartClick={() => setPage("cart")}
          addToCart={addToCart}
        />
      )}

      {/* TENTANG */}
      {page === "tentang" && (
        <TentangPage
          onBackHome={() => setPage("home")}
          onProdukClick={() => setPage("produk")}
          onKeunggulanClick={() => setPage("keunggulan")}
          onCartClick={() => setPage("cart")}
          onProfileClick={() => setPage("profile")}
        />
      )}

      {/* KEUNGGULAN */}
      {page === "keunggulan" && (
        <KeunggulanPage
          onBackHome={() => setPage("home")}
          onProdukClick={() => setPage("produk")}
          onTentangClick={() => setPage("tentang")}
          onCartClick={() => setPage("cart")}
          onProfileClick={() => setPage("profile")}
        />
      )}

      {/* CART */}
      {page === "cart" && (
        <CartPage
          cart={cart}
          onBackHome={() => setPage("home")}
          onRemoveSelected={removeSelectedFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {/* CHECKOUT */}
      {page === "checkout" && (
        <CheckoutPage
          items={checkoutItems}
          onBackCart={() => setPage("cart")}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* PROFILE */}
      {page === "profile" && (
        <ProfilePage
          onBackHome={() => setPage("home")}
          onLogout={handleLogout}
        />
      )}

      {/* ADMIN - INI YANG SUDAH DIPERBAIKI */}
      {page === "admin" && <AdminPage onBackHome={() => setPage("home")} />}
    </>
  );
}