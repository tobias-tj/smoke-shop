"use client";

import React, { useEffect, useState } from "react";
import { FilterAndListProductsProps } from "./FinterAndListProducts.types";
import { FiltersState } from "../FilterProducts/FilterProducts.types";
import FilterProducts from "../FilterProducts/FilterProducts";
import ListProducts from "../ListProducts/ListProducts";


export default function FilterAndListProducts({ products }: FilterAndListProductsProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [filters, setFiltersState] = useState<FiltersState>({
    search: "",
    category: "",
    sort: "",
    priceRange: [0, 500], // default range
  });

  const setFilters = (name: string, value: any) => {
    setFiltersState((prev) => ({ ...prev, [name]: value }));
  };

  const cleanFilters = () => {
    setFiltersState({
      search: "",
      category: "",
      sort: "",
      priceRange: [0, 500],
    });
  };

  useEffect(() => {
    let result = [...products];

    // Search
    if (filters.search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // PRICE RANGE
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] &&
        p.price <= filters.priceRange[1]
    );

    // SORTING
    if (filters.sort === "price_low") result.sort((a, b) => a.price - b.price);
    if (filters.sort === "price_high") result.sort((a, b) => b.price - a.price);
    if (filters.sort === "recent")
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

    setFilteredProducts(result);
  }, [filters, products]);

  return (
    <div>
      <FilterProducts
        filters={filters}
        setFilters={setFilters}
        cleanFilters={cleanFilters}
      />
      <ListProducts products={filteredProducts} />
    </div>
  );
}
