"use client";

import { useState, useRef } from "react";
import { ButtonAddProduct } from "./components/ButtonAddProduct";
import { FormAddProduct } from "./components/FormAddProduct";
import { FormEditProduct } from "./components/FormEditProduct";
import { motion } from "framer-motion";
import { ListProducts } from "./components/ListProducts";
import { Product } from "@prisma/client";

export default function ProductsManagerPage() {
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const listRef = useRef<{ refresh: () => void }>(null);

  const handleSuccess = () => {
    setShowForm(false);
    setEditProduct(null);
    listRef.current?.refresh();
  };

  const openCreateForm = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage your products</h2>

        {!showForm && (
          <ButtonAddProduct onToggle={openCreateForm} showForm={showForm} />
        )}

        {showForm && (
          <ButtonAddProduct
            onToggle={() => { setShowForm(false); setEditProduct(null); }}
            showForm={true}
          />
        )}
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border p-6 bg-card shadow-sm"
        >
          {editProduct ? (
            <FormEditProduct product={editProduct} onSuccess={handleSuccess} />
          ) : (
            <FormAddProduct onSuccess={handleSuccess} />
          )}
        </motion.div>
      )}

      <ListProducts ref={listRef} onEdit={openEditForm} />
    </div>
  );
}
