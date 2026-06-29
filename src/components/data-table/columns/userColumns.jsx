import {
} from "@/components/ui/dropdown-menu";
import ActionMenu from "./ActionMenu";

export const columns = [
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
                row={user} 
                onView={() => console.log("View", user)} 
                onEdit={() => console.log("Edit", user)} 
                onDelete={() => console.log("Delete", user)} 
            />
            </div>
        );
        },
    },
];