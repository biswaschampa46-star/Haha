import { NextRequest, NextResponse } from "next/server";
import { queryProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const products = await queryProducts({
    category: params.get("category"),
    sort: params.get("sort"),
    q: params.get("q"),
    featured: params.get("featured") === "1",
    isNew: params.get("new") === "1",
    limit: params.get("limit") ? Number(params.get("limit")) : undefined,
  });
  return NextResponse.json(products);
}
