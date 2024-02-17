'use client';
import { TypographyH1 } from "@/components/ui/typography/typography-h1";
import { SWRConfig } from "swr/_internal";
import { Separator } from "@/components/ui/separator";
import { AddCenterButton } from "./_components/add-center-button";
import { CentersList } from "./_components/centers-list";

export default function Centers() {
  return (
    <SWRConfig>
      <div className="flex flex-col justify-items-center sm:flex-row sm:justify-between mb-12">
        <TypographyH1>Bat Caves</TypographyH1>
        <AddCenterButton />
      </div>
      <Separator />
      <CentersList />
    </SWRConfig>
  );
}
