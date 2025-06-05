"use server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";

// Validation Schemas
const fileSchema = z.instanceof(File, { message: "File is required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().int().min(1, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().int().min(1, "Stock must be a positive integer"),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

// Add Product Action
export async function addProducts(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries())); // Convert FormData to a plain object
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // Ensure the category exists or create it
  const category = await prisma.category.upsert({
    where: { name: data.category },
    update: {}, // If the category exists, do nothing
    create: { name: data.category }, // If the category doesn't exist, create it
  });

  // Create a directory for product images
  await fs.mkdir("public/products", { recursive: true });
  const imageUrl = `products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public/${imageUrl}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  // Save the product details
  await prisma.product.create({
    data: {
      name: data.name,
      price: data.price, // Store price in cents
      description: data.description,
      category: { connect: { id: category.id } },
      isAvailable: true,
      stock: data.stock,
      imageUrl,
    },
  });

  redirect("/admin/products");
}

// Update Product Action
const editSchema = addSchema.extend({
  image: imageSchema.optional(),
});

export async function editProducts(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries())); // Convert FormData to a plain object
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await prisma.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  const imageUrl = product.imageUrl;
  if (data.image != null && data.image.size > 0) {
   await fs.unlink (`public/${product.imageUrl}`)
    const imageUrl = `products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public/${imageUrl}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  // Ensure the category exists or create it
  const category = await prisma.category.upsert({
    where: { name: data.category },
    update: {}, // If the category exists, do nothing
    create: { name: data.category }, // If the category doesn't exist, create it
  });

  // Save the product details
  await prisma.product.update({
    where: {id},
    data: {
      name: data.name,
      price: data.price, // Store price in cents
      description: data.description,
      category: { connect: { id: category.id } },
      stock: data.stock,
      imageUrl,
    },
  });

  redirect("/admin/products");
}

// Toggle Product Availability
export async function toggleProductAvailability(
  id: string,
  isAvailable: boolean
) {
  await prisma.product.update({ where: { id }, data: { isAvailable } });
}

// Delete the product from the database
export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({ where: { id } });

  if (product == null) return notFound();

  // Remove the image file from the public directory
  await fs.unlink(`public/${product.imageUrl}`);
}
