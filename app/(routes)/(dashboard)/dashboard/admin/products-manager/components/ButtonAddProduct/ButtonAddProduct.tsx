"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";

export function ButtonAddProduct({ onToggle, showForm }: { onToggle: () => void; showForm: boolean }) {
  return (
    <Button variant="outline" onClick={onToggle}>
      {showForm ? (
        <>
          Close <XCircle className="ml-2 h-4 w-4" />
        </>
      ) : (
        <>
          Add Product <PlusCircle className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
