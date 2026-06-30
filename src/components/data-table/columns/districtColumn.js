import ActionMenu from "./ActionMenu";
import { createActions } from "./actions/createActions";

export const districtColumns = (ability) => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "District Name",
  },
  {
    accessorKey: "census_code",
    header: "Census Code",
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const district = row.original;

      return (
        <div className="flex justify-center">
          <ActionMenu
            actions={createActions({
              ability,
              subject: "Districts",
              row: district,
              onView: (district) => console.log("View", district),
              onEdit: (district) => console.log("Edit", district),
              onDelete: (district) => console.log("Delete", district),
            })}
          />
        </div>
      );
    },
  },
];