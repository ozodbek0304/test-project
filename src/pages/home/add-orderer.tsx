import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import PhoneField from "@/components/form/phone-field"
import { FormSelect } from "@/components/form/select"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const positions = [
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "Direktor", value: "Direktor" },
    { label: "Menejer", value: "Menejer" },
    { label: "Ishchi", value: "Ishchi" },
]

type Props = {
    item: UserInfo | null
    setCurrent: (val: UserInfo | null) => void
}

const AddCustomer = ({ item, setCurrent }: Props) => {
    const queryClient = useQueryClient()

    const form = useForm<UserInfo>()
    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yaratildi")
            form.reset()
            queryClient.invalidateQueries({ queryKey: ["employees"] })
        },
    })
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            form.reset()
            queryClient.invalidateQueries({ queryKey: ["employees"] })
            setCurrent(null)
        },
    })

    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: UserInfo) => {
        console.log(values)
        if (item?.id) {
            mutateUpdate(`employees/${item?.id}`, values)
        } else {
            mutateCreate("employees", values)
        }
    }

    useEffect(() => {
        if (item?.id) {
            form.reset(item)
        } else {
            form.reset({
                first_name: "",
                last_name: "",
                father_name: "",
                phone: "",
                age: "",
                position: "",
                bio: "",
            })
        }
    }, [item])

    return (
        <Card className="w-full border shadow-md">
            <CardContent className="space-y-4">
                <h1>Yangi foydalanuvchi qo'shish</h1>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <FormInput
                        required
                        methods={form}
                        name="first_name"
                        label="Ism"
                    />
                    <FormInput
                        required
                        methods={form}
                        name="last_name"
                        label="Familiya"
                    />
                    <FormInput
                        required
                        methods={form}
                        name="father_name"
                        label="Otasining ismi"
                    />
                    <PhoneField
                        methods={form}
                        name="phone"
                        label="Telefon raqami"
                        required
                        hideError={true}
                    />
                    <FormNumberInput
                        control={form.control}
                        name="age"
                        thousandSeparator="  "
                        label="Yoshi"
                        required
                    />
                    <FormSelect
                        name="position"
                        label="Lavozimi"
                        options={positions}
                        control={form.control}
                        required
                    />
                    <FormTextarea methods={form} name="bio" label="Bio" />
                    <div className="flex gap-4 justify-end">
                        <Button loading={disabled}>Saqlash</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default AddCustomer
