import db from "@/lib/connectDB";
import Products from "@/models/products";
import { NextResponse } from "next/server";



export async function GET() {
    await db.connect();
    const products = await Products.find();
    return NextResponse.json({ products });
  }