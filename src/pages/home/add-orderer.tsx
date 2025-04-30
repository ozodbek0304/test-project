import FileUpload2 from "@/components/form/file-upload2"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { FormPhoneNumber } from "@/components/form/phone-number"
import { FormSelect } from "@/components/form/select"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRequest } from "@/hooks/useRequest"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"
import { Plus } from "lucide-react"
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

const AddCustomer = ({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: (open: boolean) => void
}) => {
    const search: any = useSearch({ from: "/_main" })
    const queryClient = useQueryClient()

    const { post, isPending } = useRequest(
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries({
                    queryKey: ["accountant/clients/", search],
                })
                toast.success("Muvaffaqiyatli qo'shildi")
                setOpen(false)
                form.reset()
            },
        },
        { contentType: "multipart/form-data" },
    )
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        disabled: isPending,
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        post("employees/", data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button icon={<Plus width={20} />}>
                    Foydalanuvchi qo'shish
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Yangi foydalanuvchi qo'shish</DialogTitle>
                </DialogHeader>

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
                    <FormPhoneNumber
                        required
                        control={form.control}
                        name="phone"
                        label="Telefon raqami"
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
                    <FileUpload2
                        control={form.control}
                        name="photo"
                        wrapperClassName="!min-w-full"
                        multiple={false}
                    />
                    <div className="flex gap-4 justify-end">
                        <Button loading={isPending}>Saqlash</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
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
