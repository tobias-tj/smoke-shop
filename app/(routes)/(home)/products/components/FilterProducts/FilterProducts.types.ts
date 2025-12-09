export type FiltersState = {
  search: string;
  category: "" | "VAPE" | "ESSENCE" | "ACCESSORY" | "OTHER";
  sort: "" | "price_low" | "price_high" | "recent";
  priceRange: [number, number];
};


export type FilterProductsProps = {
  filters: FiltersState;
  setFilters: (name: keyof FiltersState, value: any) => void;
  cleanFilters: () => void;
};
