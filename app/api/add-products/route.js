import db from "@/lib/connectDB";
import Products from "@/models/products";
import { NextResponse } from "next/server";


export async function POST(request) {
    const {description,name,price,imageURL,category,checked} = await request.json();
    await db.connect()


    await Products.create({name, price,imageURL,description,category,checked})
    return NextResponse.json({message:'Food Created'},{status:201})
}