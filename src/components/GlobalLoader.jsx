import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GlobalLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for the entire website to load
    const handleLoad = () => setLoading(false);

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!loading) return null; // Hide loader when website is loaded

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="mt-4 text-primary text-lg font-semibold">Loading...</p>
    </motion.div>
  );
};

export default GlobalLoader;
