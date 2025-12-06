"use client";

import { useState } from "react";
import { ButtonAddProduct } from "./components/ButtonAddProduct";
import { FormAddProduct } from "./components/FormAddProduct";
import { motion } from "framer-motion";
import { ListProducts } from "./components/ListProducts";
import { useRef } from "react";

export default function ProductsManagerPage() {
  const [showForm, setShowForm] = useState(false);
    const listRef = useRef<{ refresh: () => void }>(null);

    const handleSuccess = () => {
    setShowForm(false);
    listRef.current?.refresh();
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage your products</h2>
        <ButtonAddProduct onToggle={() => setShowForm((prev) => !prev)} showForm={showForm} />
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border p-6 bg-card shadow-sm"
        >
          <FormAddProduct onSuccess={handleSuccess} />
        </motion.div>
      )}
      <ListProducts ref={listRef}/>
    </div>
  );
}
