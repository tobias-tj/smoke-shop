"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { FilterProductsProps } from "./FilterProducts.types";

export default function FilterProducts({
  filters,
  setFilters,
  cleanFilters,
}: FilterProductsProps) {
  return (
    <div className="mt-5 mb-8 flex flex-col space-y-2 md:flex-row md:space-y-0 md:gap-5">

      {/* Search */}
      <Input
        placeholder="Search product..."
        className="w-[200px]"
        value={filters.search}
        onChange={(e) => setFilters("search", e.target.value)}
      />

      {/* Category */}
      <Select
        onValueChange={(value) => setFilters("category", value)}
        value={filters.category}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="VAPE">Vape</SelectItem>
          <SelectItem value="ESSENCE">Essence</SelectItem>
          <SelectItem value="ACCESSORY">Accessory</SelectItem>
          <SelectItem value="OTHER">Other</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort by */}
      <Select
        onValueChange={(value) => setFilters("sort", value)}
        value={filters.sort}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price_low">Price: low → high</SelectItem>
          <SelectItem value="price_high">Price: high → low</SelectItem>
          <SelectItem value="recent">Most recent</SelectItem>
        </SelectContent>
      </Select>

      {/* Price Range Slider */}
      <div className="flex flex-col w-[220px] mb-8">
        <p className="text-sm text-gray-600 mb-1">
          Price range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </p>

        <Slider
          min={0}
          max={500}
          step={5}
          value={filters.priceRange}
          onValueChange={(value) =>
            setFilters("priceRange", value as number[])
          }
        />
      </div>

      <Button variant="secondary" onClick={cleanFilters} className="mt-2">
        Clear Filters <Trash className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
