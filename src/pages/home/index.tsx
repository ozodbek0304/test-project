import { CollapsibleDataTable } from "@/components/collapsible-table"
import { useGet } from "@/hooks/useGet"
import { useColumns } from "./columns"
import AddOrderer from "./add-orderer"
import { useState } from "react"
import { useSearch } from "@tanstack/react-router"

const HomePages = () => {
    const [open, setOpen] = useState(false)

    const search: any = useSearch({ from: "/_main" })

    const { data, isLoading } = useGet<{
        total_pages: number
        results: UserInfo[]
    }>(
        "employees/",
        { ...search},
    )

    return (
        <div>
            <CollapsibleDataTable
                columns={useColumns({
                    onAdd: () => setOpen(true),
                    onEdit: (val) => {
                        setOpen(true)
                    },
                })}
                data={data?.results?.map((item) => ({
                    ...item,
                }))}
                paginationProps={{ totalPages: data?.total_pages || 1 }}
                loading={isLoading}
                head={
                    <div className="flex  justify-end">
                        {<AddOrderer open={open} setOpen={setOpen} />}
                    </div>
                }
            />
        </div>
    )
}

export default HomePages
