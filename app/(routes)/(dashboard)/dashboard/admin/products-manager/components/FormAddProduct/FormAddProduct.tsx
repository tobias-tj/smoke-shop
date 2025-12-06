"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { formSchema } from "./FormAddProduct.form";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function FormAddProduct({ onSuccess }: { onSuccess?: () => void }) {

  const [photoUploaded, setPhotoUploaded] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "OTHER",
      price: "",
      cost: "",
      stock: 0,
      image: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Product data:", data);

    if (onSuccess) onSuccess();
    try{
      const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
      toast.promise(promise, {
        loading: "Adding product...",
        success: "Product added successfully!",
      })
      await axios.post("/api/products", data);
       
     
      onSuccess?.();
    }catch(error){  
      toast.error("Error adding product");
    }

  };

  const {isValid} = form.formState;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* ----------- NAME ----------- */}
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

          {/* ----------- DESCRIPTION ----------- */}
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

          {/* ----------- CATEGORY (dropdown) ----------- */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
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

          {/* ----------- PRICE ----------- */}
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
                  <Input
                    placeholder="19.99"
                    {...field}
                    className="pl-7"
                  />
                </FormControl>
              </div>
              <FormMessage /> 
            </FormItem>
          )}
        />


          {/* ----------- COST (optional) ----------- */}
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Cost</FormLabel>

                {/* ICON + POPOVER */}
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
                    This is how much you paid to acquire the product.  
                    We use this value to calculate your **net profit** inside the admin analytics.
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


          {/* ----------- STOCK ----------- */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Stock</FormLabel>
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

          {/* ----------- IMAGE ----------- */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                 {photoUploaded ? (
                  <p className="text-sm">Image Uploaded!</p>
                 ): (
                  <UploadButton
                  className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3 outline-slate-800 p-2"
                  endpoint="photo"
                  onClientUploadComplete={(res) => {
                    form.setValue("image", res?.[0].ufsUrl);
                    setPhotoUploaded(true);
                  }}
                  onUploadError={(error) => {
                    console.log(error);
                  }}
                  />
                 )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ----------- SUBMIT BUTTON ----------- */}
          <Button type="submit" className="w-full mt-5" disabled={!isValid}>
            Create Product
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
