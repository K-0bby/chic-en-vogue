"use server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";

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


  await fs.mkdir("public/products", { recursive: true });
  const imageUrl = `products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public/${imageUrl}`,
    Buffer.from(await data.image.arrayBuffer())
  );

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
