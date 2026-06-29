import ActionMenu from "./ActionMenu";
import { createActions } from "./actions/createActions";

export const getUserColumns = (ability) => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex justify-center">
          <ActionMenu
            actions={createActions({
              ability,
              subject: "Districts",
              row: user,
              onView: (user) => console.log("View", user),
              onEdit: (user) => console.log("Edit", user),
              onDelete: (user) => console.log("Delete", user),
            })}
          />
        </div>
      );
    },
  },
];