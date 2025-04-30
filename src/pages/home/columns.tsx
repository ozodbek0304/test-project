import { Button } from "@/components/ui/button"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from "lucide-react"

export const useColumns = ({
    onEdit,
}: {
    onAdd: () => void
    onEdit: (val: UserInfo) => void
}): ColumnDef<UserInfo>[] => {
    return [
        {
            header: "№",
            cell: ({ row }) => (row.original.id ? row.index + 1 : ""),
        },
        {
            header: "Rasmi",
            accessorKey: "photo",
            cell: ({ row }) => (
                <img
                    src={row.original.phone}
                    alt={row.original.first_name}
                    className="w-10 h-10"
                />
            ),
        },
        {
            header: "F.I.O",
            cell: ({ row }) =>
                row.original?.first_name ? (
                    <div className="flex flex-col text-sm">
                        <span>{row.original.first_name}</span>
                        <span>{row.original.last_name}</span>
                        <span>{row.original.father_name}</span>
                    </div>
                ) : (
                    ""
                ),
        },
        {
            header: "Telefon raqam",
            accessorKey: "phone",
            cell: ({ row }) => formatPhoneNumber(row.original.phone),
        },
        {
            header: "Yoshi",
            accessorKey: "age",
        },
        {
            header: "Lavozimi",
            accessorKey: "position",
        },
        {
            header: "Bio",
            accessorKey: "bio",
        },

        {
            header: "Amallar",
            cell: ({ row }) => (
                <div>
                    <Button
                        icon={<Edit width={18} />}
                        size="sm"
                        variant="ghost"
                        className="!text-primary"
                        onClick={() => onEdit(row.original as any)}
                    />
                </div>
            ),
        },
    ]
}
