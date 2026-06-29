import { Eye, Pencil, Trash2 } from "lucide-react";

export const createActions = ({ ability, subject, row, onView, onEdit, onDelete }) => [
  ability.can("read", subject) && {
    label: "View",
    icon: Eye,
    onClick: () => onView(row),
  },

  ability.can("update", subject) && {
    label: "Edit",
    icon: Pencil,
    onClick: () => onEdit(row),
  },

  ability.can("delete", subject) && {
    label: "Delete",
    icon: Trash2,
    onClick: () => onDelete(row),
  },
].filter(Boolean);