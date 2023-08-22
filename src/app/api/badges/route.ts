import Tech from "@/data/ignore/tech";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // console.log(request.nextUrl.searchParams);
  const inputValue = request.nextUrl.searchParams.get("input");
  const style = request.nextUrl.searchParams.get("style");
  const options = Object.entries(Tech).map(([key, info]) => {
    if (style === "text") {
      return { label: key, value: info.slug };
    } else {
      const { slug, badgeColor, logo, logoColor } = info;
      const badgeURL = `https://img.shields.io/badge/${slug}-${badgeColor}?style=for-the-badge&logo=${logo}&logoColor=${logoColor}`;
      return { label: key, value: badgeURL };
    }
  });

  let filteredOptions = options;
  if (inputValue) {
    filteredOptions = options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
  return NextResponse.json(filteredOptions);
}
