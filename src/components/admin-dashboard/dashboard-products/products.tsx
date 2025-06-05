import { PageHeader } from "./page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { NewProduct } from "./new";
import { EditPage } from "./edit";
import prisma from "@/lib/prisma";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency } from "@/components/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import Link from "next/link";
import { ActiveToggle, DeleteItem } from "./product-action";

export default async function ProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <NewProduct />
      </div>
      <ProductList />
    </>
  );
}

async function ProductList() {
  // const product = await prisma.product.findUnique({ where: { id } });
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      categoryId: true,
      isAvailable: true,
      stock: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          name: true, // Fetch category name
        },
      },
    },
  });

  if (products.length === 0) return <p>No products found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailable ? (
                <>
                  <CheckCircle2 className="stroke-green-500" />{" "}
                  <span className="sr-only">Available</span>
                </>
              ) : (
                <>
                  <XCircle className="stroke-destructive" />{" "}
                  <span className="sr-only">Not Available</span>
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-3">
                    <DropdownMenuItem asChild>
                    <EditPage product={{ ...product, categoryId: product.category.name }} />
                    </DropdownMenuItem>
                  {/* To toggle the isAvailable action on products*/}
                  <ActiveToggle
                    id={product.id}
                    isAvailable={product.isAvailable}
                  />
                  {/* To delete products */}
                  <DeleteItem id={product.id} disabled={product.stock <= 0} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
