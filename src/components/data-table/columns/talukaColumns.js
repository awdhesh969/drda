import ActionMenu from "./ActionMenu";
import { createActions } from "./actions/createActions";

export const talukaColumns = (ability) => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Taluka Name",
  },
  {
    accessorKey: "census_code",
    header: "Census Code",
  },
   {
    accessorKey: "district_name",
    header: "District Name",
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const taluka = row.original;

      return (
        <div className="flex justify-center">
          <ActionMenu
            actions={createActions({
              ability,
              subject: "Talukas",
              row: taluka,
              onView: (taluka) => console.log("View", taluka),
              onEdit: (taluka) => console.log("Edit", taluka),
              onDelete: (taluka) => console.log("Delete", taluka),
            })}
          />
        </div>
      );
    },
  },
];