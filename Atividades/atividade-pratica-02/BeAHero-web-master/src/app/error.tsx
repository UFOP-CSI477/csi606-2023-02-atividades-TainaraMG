"use client";

import { TypographyH1 } from "@/components/ui/typography/typography-h1";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";

export default function Error() {
  return (
    <div className="py-20 container mx-auto min-h-screen">
       <div className="h-[calc(100vh_/_2)] grid place-content-center">
        <TypographyH1>The Justice League has been attacked</TypographyH1>
        <TypographyH4>We will be right back to save the day :)</TypographyH4>
      </div>
    </div>
  );
}
