import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface ActionItem<T> {
  label: string;
  onClick: (row: T) => void;
  variant?: "default" | "danger";
}

interface ActionDropdownProps<T> {
  row: T;
  actions: ActionItem<T>[];
}

export function ActionDropdown<T>({ row, actions }: ActionDropdownProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.label}
            onClick={() => action.onClick(row)}
            className={action.variant === "danger" ? "text-red-600" : ""}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
