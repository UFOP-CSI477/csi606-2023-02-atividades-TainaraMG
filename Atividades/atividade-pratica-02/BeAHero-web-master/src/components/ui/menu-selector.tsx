"use client";

import * as React from "react";
import {
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function MenuSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="ml-2">
          <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
          <span className="sr-only">Navigate through the Justice Hall</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
      <Link href={"/"}>
          <DropdownMenuItem>Saving the day</DropdownMenuItem>
        </Link>
        <Link href={"/heroes"}>
          <DropdownMenuItem>Heroes</DropdownMenuItem>
        </Link>
        <Link href={"/centers"}>
          <DropdownMenuItem>Bat Caves</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
