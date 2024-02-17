'use client';
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ColorModeToggle } from "@/components/ui/color-mode-toggle";
import { TypographyH1 } from "@/components/ui/typography/typography-h1";
import { TypographyH2 } from "@/components/ui/typography/typography-h2";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";
import { cn } from "@/lib/utils";
import { BellIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { SWRConfig } from "swr/_internal";
import { Separator } from "@/components/ui/separator";
import { AddHeroButton } from "./_components/add-hero-button";
import { HeroesList } from "./_components/heroes-list";

export default function Heroes() {
  return (
    <SWRConfig>
      <div className="flex flex-col justify-items-center sm:flex-row sm:justify-between mb-12">
        <TypographyH1>Heroes</TypographyH1>
        <AddHeroButton />
      </div>
      <Separator />
      <HeroesList />
    </SWRConfig>
  );
}
