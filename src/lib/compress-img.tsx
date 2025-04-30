import imageCompression, { Options } from "browser-image-compression"
import { toast } from "sonner"

export default async function compressImg(file: File, opts?: Options) {
    const options: Options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        ...opts,
    }

    try {
        const compressedBlob = await imageCompression(file, options)
        const compressedFile = new File([compressedBlob], file.name, {
            type: file.type,
            lastModified: Date.now(),
        })

        return compressedFile
    } catch (error) {
        toast.error(
            "Rasm hajmini kichraytirishda muammo yuzaga keldi. Qayta urinib ko'ring yoki kichkina hajmli rasm yuklang!",
        )
    }
}
