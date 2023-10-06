import db from "@/lib/connectDB";
import ProductsList from "@/models/ProductList";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, completed, products } = await request.json();
  await db.connect();
  console.log( name, completed, products)

  await ProductsList.create({ name, completed, products });
  return NextResponse.json(
    { message: "list Created" },
    { status: 201 }
  );
}

