import { Eye, Pencil, Trash2 } from "lucide-react";

export const createActions = ({ ability, subject, row, onView, onEdit, onDelete }) => [
  ability.can("read", subject) && {
    label: "View",
    icon: Eye,
    className: "text-blue-500",
    onClick: () => onView(row),
  },

  ability.can("update", subject) && {
    label: "Edit",
    icon: Pencil,
    className: "text-yellow-500",
    onClick: () => onEdit(row),
  },

  ability.can("delete", subject) && {
    label: "Delete",
    icon: Trash2,
    className: "text-red-500",
    onClick: () => onDelete(row),
  },
].filter(Boolean);