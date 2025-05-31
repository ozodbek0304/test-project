import { useGet } from "@/hooks/useGet"
import { useColumns } from "./columns"
import AddOrderer from "./add-orderer"
import { useSearch } from "@tanstack/react-router"
import { DataTable } from "@/components/ui/datatable"

const HomePages = () => {

    const search: any = useSearch({ from: "/_main" })

    const { data, isLoading } = useGet<{
        total_pages: number
        results: UserInfo[]
    }>("employees/", { ...search })

    const columns = useColumns()
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className=" lg:col-span-4">
                <AddOrderer />
            </div>
            <div className=" lg:col-span-8">
                <DataTable
                    columns={columns}
                    data={data?.results}
                    paginationProps={{ totalPages: data?.total_pages || 1 }}
                    loading={isLoading}
                />
            </div>
        </div>
    )
}

export default HomePages
