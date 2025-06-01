import { useGet } from "@/hooks/useGet"
import { useColumns } from "./columns"
import AddOrderer from "./add-orderer"
import { useSearch } from "@tanstack/react-router"
import { DataTable } from "@/components/ui/datatable"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import ParamInput from "@/components/as-params/input"
import { formatMoney } from "@/lib/format-money"
import { Badge } from "@/components/ui/badge"

const HomePages = () => {
    const search: any = useSearch({ from: "/_main" })
    const [current, setCurrent] = useState<UserInfo | null>(null)
    const [currentId, setCurrentID] = useState<number>(0)
    const { openModal: openModalDelete } = useModal("delete")

    const handleItemEdit = (item: UserInfo) => {
        if (item.id) {
            setCurrent(item)
        }
    }

    const handleItemDelete = (id: number) => {
        if (id) {
            setCurrentID(id)
            openModalDelete()
        }
    }

    const { data, isLoading } = useGet<{
        total_pages: number
        results: UserInfo[]
    }>("employees", { params: search })

    const columns = useColumns()
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className=" lg:col-span-4">
                <AddOrderer item={current} setCurrent={setCurrent} />
            </div>
            <Card className=" lg:col-span-8 overflow-x-auto border shadow-md">
                <CardContent>
                    <div className="flex flex-col lg:flex-row items-center gap-3 justify-between">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-medium">
                                Foydalanuvchilar ro'yxati
                            </h1>
                            <Badge>{formatMoney(data?.results.length)}</Badge>
                        </div>
                        <div className="mb-3 w-full lg:w-max">
                            <ParamInput
                                fullWidth
                                placeholder="Qidiruv..."
                                className="lg:w-[256px]"
                            />
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={data?.results}
                        paginationProps={{ totalPages: data?.total_pages || 1 }}
                        loading={isLoading}
                        onEdit={(row) => handleItemEdit(row.original)}
                        onDelete={(row) => handleItemDelete(row.original.id)}
                    />
                </CardContent>
            </Card>
            <DeleteModal id={currentId} path={"employees"} />
        </div>
    )
}

export default HomePages
