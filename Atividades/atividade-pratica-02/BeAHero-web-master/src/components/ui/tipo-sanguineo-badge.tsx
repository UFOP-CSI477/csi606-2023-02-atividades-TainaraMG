import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { TipoSanguineoEnum } from "@/enum";

interface TipoSanguineoBadgeProps {
    factor: TipoSanguineoEnum;
    type: string;
    hasBorder?: boolean;
}

export const TipoSanguineoBadge = ({type, factor,hasBorder = true}: TipoSanguineoBadgeProps) => {
    return (
        <Badge variant={"outline"} className={cn(!hasBorder && "border-none")}>
        <p className="text-sm text-muted-foreground">{type}{factor === TipoSanguineoEnum.POSITIVO ? "+" : "-"}</p>
      </Badge>
    )
}