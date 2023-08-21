import Tech from "@/data/ignore/tech";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request.nextUrl.searchParams);
  const inputValue = request.nextUrl.searchParams.get("input");
  const options = Object.entries(Tech).map(([key, info]) => {
    return { label: key, value: info.slug };
  });

  if (inputValue) {
    const filteredOptions = options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    return NextResponse.json(filteredOptions);
  } else {
    return NextResponse.json(options);
  }
}
