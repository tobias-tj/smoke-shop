"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form, FormField, FormControl, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select";
import { formSchema } from "../FormAddProduct/FormAddProduct.form";
import { Product } from "@prisma/client";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

export function FormEditProduct({
  product,
  onSuccess,
}: {
  product: Product;
  onSuccess?: () => void;
}) {

  // Track image preview
  const [preview, setPreview] = useState<string | null>(product.image ?? null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description ?? "",
      category: product.category,
      price: String(product.price),
      cost: product.cost ? String(product.cost) : "",
      stock: product.stock,
      image: product.image ?? "",
    },
  });

  type FormValues = z.infer<typeof formSchema>;

  const onSubmit = async (data: FormValues) => {
    try {
      const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 3000));
      toast.promise(promise, {
        loading: "Updating product...",
        success: "Product updated successfully!",
      })   
      await axios.patch(`/api/products/${product.id}/form`, data);
      
      onSuccess?.();
    } catch {
      toast.error("Error updating product");
    }
  };

  const { isValid } = form.formState;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* NAME */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Lost Mary 5K" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Optional description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CATEGORY */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VAPE">Vape</SelectItem>
                    <SelectItem value="ESSENCE">Essence</SelectItem>
                    <SelectItem value="ACCESSORY">Accessory</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PRICE */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (USD)</FormLabel>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <FormControl>
                    <Input placeholder="19.99" {...field} className="pl-7" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* COST */}
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Cost</FormLabel>

                  {/* Info Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground transition"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent side="right" align="start" className="w-64 text-sm">
                      <p className="font-medium mb-1">What is “Cost”?</p>
                      <p className="text-muted-foreground">
                        This is how much you paid for this item.  
                        It's used to calculate **net profit** in analytics.
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>

                <FormControl>
                  <Input placeholder="Optional, ex: 10.00" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* STOCK */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IMAGE FIELD WITH PREVIEW */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Image</FormLabel>

                      {preview && (
                        <div className="mb-3">
                          <img
                            src={preview}
                            alt="Product preview"
                            className="h-28 w-28 object-cover rounded-md border"
                          />
                        </div>
                      )}

                      <FormControl>
                        <input
                          type="file"
                          accept="image/*"
                          className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3 outline-slate-800 p-2"
                          onChange={async (e) => {
                            if (!e.target.files?.[0]) return;
                            const file = e.target.files[0];

                            const formData = new FormData();
                            formData.append("file", file);

                            try {
                              const res = await fetch("/api/uploadthing", {
                                method: "POST",
                                body: formData,
                              });
                              const data = await res.json();
                              form.setValue("image", data.url);
                              setPreview(data.url);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT */}
          <Button type="submit" className="w-full mt-5" disabled={!isValid}>
            Save Changes
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
