import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"

export const useColumns = (): ColumnDef<UserInfo>[] => {
    return [
        {
            header: "№",
            cell: ({ row }) => (row.original.id ? row.index + 1 : ""),
        },
        {
            header: "Rasm",
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
                    <div className="flex gap-3 items-end text-sm">
                        <div className="flex flex-col">
                            <span>{row.original.first_name}</span>
                            <span>{row.original.last_name}</span>
                        </div>
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
    ]
}
