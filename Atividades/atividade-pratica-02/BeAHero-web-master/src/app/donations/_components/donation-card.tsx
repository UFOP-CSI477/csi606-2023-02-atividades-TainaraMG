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
import { IDoacaoModel, IDoacaoRequestModel } from "@/models";
import { StateBadge } from "@/components/ui/state-badge";
import moment from "moment";
import { EditDonationDialog } from "./edit-donation-dialog";
import { motion } from "framer-motion";

interface DonationCardProps {
  donation: IDoacaoModel;
  onDelete: (deletedItem: IDoacaoModel) => any;
  onUpdate: (id: number, updatedItem: IDoacaoRequestModel) => any;
}

export const DonationCard = ({
  donation,
  onDelete,
  onUpdate,
}: DonationCardProps) => {
  const [open, setOpen] = useState(false);

  const item = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
  };

  const handleDeleteDonation = () => {
    onDelete(donation);
  };

  const handleOpenEditDialog = () => {
    setOpen(true);
  };
  return (
    <motion.div key={`donation-${donation.id}`} variants={item}>
      <EditDonationDialog
        donation={donation}
        onUpdate={onUpdate}
        open={open}
        setOpen={setOpen}
      />
      <Card>
        <CardHeader className="flex flex-row justify-between justify-items-center">
          <div>
            <CardTitle className="self-center text-primary">
              {donation.pessoa.nome}
            </CardTitle>
            <CardDescription>{donation.pessoa.rg}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Manage donation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleOpenEditDialog}>
                  Edit
                  <DropdownMenuShortcut>
                    <MagicWandIcon />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteDonation}>
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
                type={donation.pessoa.tipoSanguineo.tipo}
                factor={donation.pessoa.tipoSanguineo.fator}
              />
            </div>
          </div>
          <Separator />
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <FaHouseChimneyCrack />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {donation.local.nome}
                <StateBadge state={donation.local.cidade.estado.sigla} />
              </p>
              <p className="text-sm text-muted-foreground">
                {donation.local.rua} - {donation.local.numero}
              </p>
            </div>
          </div>
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <CalendarIcon />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Donation day</p>
              <p className="text-sm text-muted-foreground">
                {moment(donation.data).format("MM/DD/YYYY")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
