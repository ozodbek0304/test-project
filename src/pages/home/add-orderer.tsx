import { FormFormatNumberInput } from "@/components/form/format-number-input"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { FormSelect } from "@/components/form/select"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePost } from "@/hooks/usePost"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const positions = [
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "Direktor", value: "Direktor" },
    { label: "Menejer", value: "Menejer" },
    { label: "Ishchi", value: "Ishchi" },
]

const AddCustomer = () => {
    const search: any = useSearch({ from: "/_main" })
    const queryClient = useQueryClient()

    const { mutate, isPending } = usePost(
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["employees/", search],
                })
                toast.success("Muvaffaqiyatli qo'shildi")
                form.reset()
            },
        },
    )
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        disabled: isPending,
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        mutate("employees/", data)
    }

    return (
        <Card className="w-full">
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
                        methods={form}
                        name="father_name"
                        label="Otasining ismi"
                    />
                    <FormFormatNumberInput
                        required
                        control={form.control}
                        name="phone"
                        label="Telefon raqami"
                        format=""
                    />
                    <FormNumberInput
                        control={form.control}
                        name="age"
                        thousandSeparator="  "
                        label="Yoshi"
                    />
                    <FormSelect
                        name="position"
                        label="Lavozimi"
                        options={positions}
                        control={form.control}
                        required
                        hideError={false}
                    />
                    <FormTextarea methods={form} name="bio" label="Bio" />
                    <div className="flex gap-4 justify-end">
                        <Button loading={isPending}>Saqlash</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default AddCustomer

const formSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    father_name: z.string().optional(),
    phone: z.string().length(12),
    age: z.string().min(1),
    position: z.string().optional(),
    bio: z.string().optional(),
    photo: z.instanceof(Blob).or(z.string()).optional(),
})
