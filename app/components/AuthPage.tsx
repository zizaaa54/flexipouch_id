"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import app from "../firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// firestore
import { getFirestore, setDoc, doc } from "firebase/firestore";

export default function AuthPage({ onLogin }: { onLogin: () => void }) {

  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);
  const db = getFirestore(app);

  const socialIcons = [
    FaGoogle,
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
  ];

  // register firestore
  const handleRegister = async () => {

    try {

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // simpan ke firestore
      await setDoc(doc(db, "user", user.uid), {
        email: user.email,
        role: "admin",
      });

      alert("Register berhasil!");

      setIsLogin(true);

    } catch (err: any) {

      alert(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f7f7] overflow-hidden relative">

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex w-full h-screen">

        {/* REGISTER */}
        <div className="w-1/2 flex items-center justify-center bg-white">

          {!isLogin && (
            <div className="w-[400px]">

              <h1 className="text-3xl font-semibold text-center mb-6 tracking-wide">
                Registration
              </h1>

              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 mb-3 bg-gray-100 rounded-lg outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-3 bg-gray-100 rounded-lg outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-100 rounded-lg outline-none"
              />

              <button
                onClick={handleRegister}
                className="w-full bg-[#8FAEB0] text-white py-3 rounded-full mb-5 font-medium"
              >
                Register
              </button>

              {/* SOCIAL */}
              <div className="flex justify-center gap-4 mt-4">

                {socialIcons.map((Icon, index) => (

                  <div
                    key={index}
                    className="w-10 h-10 border rounded-full flex items-center justify-center cursor-pointer hover:bg-[#8FAEB0] hover:text-white transition"
                  >
                    <Icon />
                  </div>

                ))}

              </div>

            </div>
          )}

        </div>

        {/* LOGIN */}
        <div className="w-1/2 flex items-center justify-center bg-white">

          {isLogin && (
            <div className="w-[400px]">

              <h1 className="text-3xl font-semibold text-center mb-6 tracking-wide">
                Login
              </h1>

              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-3 bg-gray-100 rounded-lg outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-2 bg-gray-100 rounded-lg outline-none"
              />

              <button
                onClick={() => {
                  signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                      alert("Login berhasil!");
                      onLogin();
                    })
                    .catch((err) => alert(err.message));
                }}
                className="w-full bg-[#8FAEB0] text-white py-3 rounded-full mb-5 font-medium"
              >
                Login
              </button>

              {/* SOCIAL */}
              <div className="flex justify-center gap-4 mt-4">

                {socialIcons.map((Icon, index) => (

                  <div
                    key={index}
                    className="w-10 h-10 border rounded-full flex items-center justify-center cursor-pointer hover:bg-[#8FAEB0] hover:text-white transition"
                  >
                    <Icon />
                  </div>

                ))}

              </div>

            </div>
          )}

        </div>

        {/* PANEL DESKTOP */}
        <motion.div
          animate={{
            x: isLogin ? "-100%" : "0%",
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
          className="
            absolute
            top-0
            left-1/2
            w-1/2
            h-full
            bg-[#8FAEB0]
            flex
            items-center
            justify-center
            text-center
          "
        >

          <div className="max-w-[260px] text-white">

            {!isLogin ? (
              <>
                <h2 className="text-4xl font-semibold mb-4 tracking-wide">
                  Hello, Welcome!
                </h2>

                <button
                  onClick={() => setIsLogin(true)}
                  className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#8FAEB0] transition"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-semibold mb-4 tracking-wide">
                  Hello, Welcome Back!
                </h2>

                <button
                  onClick={() => setIsLogin(false)}
                  className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#8FAEB0] transition"
                >
                  Register
                </button>
              </>
            )}

          </div>

        </motion.div>

      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden flex flex-col min-h-screen">

        {/* PANEL MOBILE */}
        <div className="w-full bg-[#8FAEB0] flex items-center justify-center text-center py-10 px-4">

          <div className="max-w-[260px] text-white">

            {!isLogin ? (
              <>
                <h2 className="text-3xl font-semibold mb-4 tracking-wide">
                  Hello, Welcome!
                </h2>

                <p className="text-sm mb-5">
                  Already have an account?
                </p>

                <button
                  onClick={() => setIsLogin(true)}
                  className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#8FAEB0] transition"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-semibold mb-4 tracking-wide">
                  Hello, Welcome Back!
                </h2>

                <p className="text-sm mb-5">
                  Don't have an account yet?
                </p>

                <button
                  onClick={() => setIsLogin(false)}
                  className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#8FAEB0] transition"
                >
                  Register
                </button>
              </>
            )}

          </div>

        </div>

        {/* FORM */}
        <div className="flex-1 flex items-center justify-center px-6 py-10 bg-white">

          {!isLogin ? (

            <div className="w-full max-w-[400px]">

              <h1 className="text-3xl font-semibold text-center mb-6 tracking-wide">
                Registration
              </h1>

              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 mb-3 bg-gray-100 rounded-lg outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-3 bg-gray-100 rounded-lg outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-100 rounded-lg outline-none"
              />

              <button
                onClick={handleRegister}
                className="w-full bg-[#8FAEB0] text-white py-3 rounded-full mb-5 font-medium"
              >
                Register
              </button>

              {/* SOCIAL */}
              <div className="flex justify-center gap-4 mt-4">

                {socialIcons.map((Icon, index) => (

                  <div
                    key={index}
                    className="w-10 h-10 border rounded-full flex items-center justify-center cursor-pointer hover:bg-[#8FAEB0] hover:text-white transition"
                  >
                    <Icon />
                  </div>

                ))}

              </div>

            </div>

          ) : (

            <div className="w-full max-w-[400px]">

              <h1 className="text-3xl font-semibold text-center mb-6 tracking-wide">
                Login
              </h1>

              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-3 bg-gray-100 rounded-lg outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-2 bg-gray-100 rounded-lg outline-none"
              />

              <button
                onClick={() => {
                  signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                      alert("Login berhasil!");
                      onLogin();
                    })
                    .catch((err) => alert(err.message));
                }}
                className="w-full bg-[#8FAEB0] text-white py-3 rounded-full mb-5 font-medium"
              >
                Login
              </button>

              {/* SOCIAL */}
              <div className="flex justify-center gap-4 mt-4">

                {socialIcons.map((Icon, index) => (

                  <div
                    key={index}
                    className="w-10 h-10 border rounded-full flex items-center justify-center cursor-pointer hover:bg-[#8FAEB0] hover:text-white transition"
                  >
                    <Icon />
                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}