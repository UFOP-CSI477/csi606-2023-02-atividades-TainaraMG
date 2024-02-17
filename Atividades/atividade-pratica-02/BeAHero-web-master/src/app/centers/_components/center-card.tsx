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
import {
  ILocalColetaModel,
  ILocalColetaRequestModel,
} from "@/models";
import { StateBadge } from "@/components/ui/state-badge";
import { motion } from "framer-motion";
import { EditCenterDialog } from "./edit-center-dialog";

interface CenterCardProps {
  center: ILocalColetaModel;
  onDelete: (deletedItem: ILocalColetaModel) => any;
  onUpdate: (id: number, updatedItem: ILocalColetaRequestModel) => any;
}

export const CenterCard = ({ center, onDelete, onUpdate }: CenterCardProps) => {
  const [open, setOpen] = useState(false);

  const item = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
  };

  const handleDeleteHero = () => {
    onDelete(center);
  };

  const handleOpenEditDialog = () => {
    setOpen(true);
  };
  return (
    <motion.div key={`center-${center.id}`} variants={item}>
      <EditCenterDialog
        center={center}
        onUpdate={onUpdate}
        open={open}
        setOpen={setOpen}
      />
      <Card>
        <CardHeader className="flex flex-row justify-between justify-items-center">
          <div>
            <CardTitle className="self-center text-primary">
              {center.nome}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Manage Bat Cave</DropdownMenuLabel>
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
            <FaHouseChimneyCrack />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {center.cidade.nome}
                <StateBadge state={center.cidade.estado.sigla} />
              </p>
              <p className="text-sm text-muted-foreground">
                {center.rua} - {center.numero}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
