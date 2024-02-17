import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaHouseChimneyCrack, FaDroplet } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  DotsHorizontalIcon,
  MagicWandIcon,
  ScissorsIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TipoSanguineoBadge } from "@/components/ui/tipo-sanguineo-badge";
import {
  IDoacaoModel,
  IDoacaoRequestModel,
  IPessoaRequestModel,
  iPessoaModel,
} from "@/models";
import { StateBadge } from "@/components/ui/state-badge";
import moment from "moment";
import { motion } from "framer-motion";
import { EditHeroDialog } from "./edit-hero-dialog";

interface HeroCardProps {
  hero: iPessoaModel;
  onDelete: (deletedItem: iPessoaModel) => any;
  onUpdate: (id: number, updatedItem: IPessoaRequestModel) => any;
}

export const HeroCard = ({ hero, onDelete, onUpdate }: HeroCardProps) => {
  const [open, setOpen] = useState(false);

  const item = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
  };

  const handleDeleteHero = () => {
    onDelete(hero);
  };

  const handleOpenEditDialog = () => {
    setOpen(true);
  };
  return (
    <motion.div key={`hero-${hero.id}`} variants={item}>
      <EditHeroDialog
        hero={hero}
        onUpdate={onUpdate}
        open={open}
        setOpen={setOpen}
      />
      <Card>
        <CardHeader className="flex flex-row justify-between justify-items-center">
          <div>
            <CardTitle className="self-center text-primary">
              {hero.nome}
            </CardTitle>
            <CardDescription>{hero.rg}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Manage hero</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleOpenEditDialog}>
                  Edit
                  <DropdownMenuShortcut>
                    <MagicWandIcon />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteHero}>
                  Delete
                  <DropdownMenuShortcut>
                    <ScissorsIcon />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="grid gap-4 my-2">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <FaDroplet />
            <div className="flex-1 space-y-1">
              <TipoSanguineoBadge
                type={hero.tipoSanguineo.tipo}
                factor={hero.tipoSanguineo.fator}
              />
            </div>
          </div>
          <Separator />
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <FaHouseChimneyCrack />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {hero.cidade.nome}
                <StateBadge state={hero.cidade.estado.sigla} />
              </p>
              <p className="text-sm text-muted-foreground">
                {hero.rua} - {hero.numero}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
