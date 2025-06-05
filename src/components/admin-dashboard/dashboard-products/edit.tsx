"use client";
import { useActionState, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { addProducts, editProducts } from "@/app/admin/_actions/product";
import { useFormStatus } from "react-dom";
import { Product } from "@/generated/prisma";
import Image from "next/image";

// This component displays a dialog form to add or edit a product
export function EditPage({ product }: { product?: Product | null }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [price, setPrice] = useState<number | undefined>(product?.price || 0); // Manages price input

// Handles form submission using either add or edit function
  const [error, action] = useActionState(
    product == null ? addProducts : editProducts.bind(null, product.id),
    {}
  );
  return (
    <>
      <div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              onClick={() => setIsDialogOpen(true)}
              className="w-full justify-start p-2 font-normal"
            >
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Products</DialogTitle>
            </DialogHeader>
            <form action={action} className="space-y-4">
              {/* Product Name & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    className="rounded-full"
                    required
                    defaultValue={product?.name || ""}
                  />
                  {error.name && (
                    <div className="text-destructive">{error.name}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    name="price"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value) || 0)}
                    className="rounded-full"
                    required
                  />
                  {error.price && (
                    <div className="text-destructive">{error.price}</div>
                  )}
                </div>
              </div>

              {/* Product Category & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={product?.categoryId}
                    className="rounded-full"
                    required
                  />
                  {error.category && (
                    <div className="text-destructive">{error.category}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    name="stock"
                    defaultValue={product?.stock}
                    className="rounded-full"
                    required
                  />
                  {error.stock && (
                    <div className="text-destructive">{error.stock}</div>
                  )}
                </div>
              </div>

              {/* Product Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  defaultValue={product?.description}
                  required
                />
                {error.description && (
                  <div className="text-destructive">{error.description}</div>
                )}
              </div>

              {/* Product Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    name="image"
                    className="rounded-full"
                    required={product == null} // Only required when adding a new product
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  {error.image && (
                    <div className="text-destructive">{error.image}</div>
                  )}
                </div>
                {product != null && (
                  <Image
                    src={`/${product.imageUrl}`}
                    height={100}
                    width={100}
                    alt="Product Image"
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <SubmitButton />
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}


// Submit button with loading state handling
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="rounded-full bg-[#ff7f50] text-white hover:bg-[#ff7f50]/80"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}
