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
import { Plus, Upload } from "lucide-react";
// import { formatCurrency } from "@/components/formatters";
import { addProducts } from "@/app/admin/_actions/product";
import {  useFormStatus } from "react-dom";

export function NewProduct() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [price, setPrice] = useState<number>(0);

  const [error, action] = useActionState( addProducts, {})
  return (
    <>
      <div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#ff7f50] text-white hover:bg-[#ff7f50]/80 rounded-full"
            >
              <Plus className="h-4 w-4" />
              Add Products
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {/* {editingProduct ? "Edit Product" : "Add New Product"} */}
              </DialogTitle>
            </DialogHeader>
            <form action={action} className="space-y-4">
              {/* Product Name & Price */}
              <div>
                <h3 className="font-bold text-2xl">Add New Products</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    className="rounded-full"
                    required
                  />
                  {error.name && <div className="text-destructive">{error.name}</div>}
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
                  {error.price && <div className="text-destructive">{error.price}</div>}
                  {/* <div className="text-muted-foreground">
                    {formatCurrency(price)}
                  </div> */}
                </div>
              </div>

              {/* Product Category & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    className="rounded-full"
                    required
                  />
                  {error.category && <div className="text-destructive">{error.category}</div>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    name="stock"
                    className="rounded-full"
                    required
                  />
                  {error.stock && <div className="text-destructive">{error.stock}</div>}
                </div>
              </div>

              {/* Product Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  required
                />
                {error.description && <div className="text-destructive">{error.description}</div>}
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
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  {error.image && <div className="text-destructive">{error.image}</div>}
                </div>
              </div>

              {/* Product Button */}
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
