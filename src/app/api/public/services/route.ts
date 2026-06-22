import { NextResponse } from "next/server";
import { getServicesPublished } from "@/lib/db-cache";
import { defaultServiceRows } from "@/lib/homepage-defaults";

export async function GET(): Promise<NextResponse> {
  try {
    const rows = (await getServicesPublished()).slice(0, 24);
    if (rows.length === 0) {
      const items = defaultServiceRows().map((row, index) => ({
        id: `default-${index}`,
        title: row.title,
        description: row.description,
        sortOrder: row.sortOrder,
      }));
      return NextResponse.json({ items });
    }
    return NextResponse.json({
      items: rows.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        sortOrder: r.order,
      })),
    });
  } catch {
    const items = defaultServiceRows().map((row, index) => ({
      id: `default-${index}`,
      title: row.title,
      description: row.description,
      sortOrder: row.sortOrder,
    }));
    return NextResponse.json({ items });
  }
}
