import db from "@/lib/connectDB";
import ProductsList from "@/models/ProductList";
import { NextResponse } from "next/server";


export async function GET() {
    await db.connect();
    const products = await ProductsList.find({});
    return NextResponse.json({ products });
  }
  