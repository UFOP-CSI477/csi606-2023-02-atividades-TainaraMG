import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { TipoSanguineoEnum } from "@/enum";

interface TipoSanguineoBadgeProps {
    state: string;
}

export const StateBadge = ({state}: TipoSanguineoBadgeProps) => {
    return (
        <Badge variant={"outline"} className={cn("border-none")}>
        <p className="text-sm text-muted-foreground">{state}</p>
      </Badge>
    )
}