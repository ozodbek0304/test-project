import {
    Control,
    FieldValues,
    Path,
    RegisterOptions,
    useController,
} from "react-hook-form"
import { cn } from "@/lib/utils"
import { NumericFormat, NumericFormatProps } from "react-number-format"
import FieldLabel from "./form-label"
import FieldError from "./form-error"
import { useEffect } from "react"

interface IProps<IForm extends FieldValues> {
    control: Control<IForm>
    name: Path<IForm>
    label?: string
    required?: boolean
    registerOptions?: RegisterOptions<IForm>
    formatOptions?: Intl.NumberFormatOptions
    wrapperClassName?: string
    thousandSeparatmor?: string
    decimalSeparator?: string
    hideError?: boolean
}

export function FormNumberInput<IForm extends FieldValues>({
    control,
    name,
    label,
    required = false,
    registerOptions,
    wrapperClassName,
    className,
    formatOptions,
    thousandSeparator,
    decimalSeparator,
    hideError = true,
    ...props
}: IProps<IForm> & NumericFormatProps) {
    const {
        field: { onChange, ref, ...field },
        fieldState,
    } = useController({
        name,
        control,
    })

    useEffect(() => {
        if (!fieldState.isDirty) {
            onChange("")
        }
    }, [fieldState.isDirty])

    return (
        <fieldset className={cn("flex flex-col w-full", wrapperClassName)}>
            {label && (
                <FieldLabel
                    htmlFor={name}
                    required={required}
                    isError={!!fieldState.error}
                >
                    {label}
                </FieldLabel>
            )}
            <label className="relative flex items-center">
                <NumericFormat
                    id={name}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                        fieldState.isTouched &&
                        !!fieldState.error &&
                        !label &&
                        "border-destructive focus:border-border !ring-destructive",
                    )}
                    thousandSeparator={thousandSeparator}
                    decimalSeparator={decimalSeparator}
                    getInputRef={ref}
                    {...props}
                    {...field}
                    value={field.value || props.defaultValue}
                    onValueChange={(val) => {
                        onChange(val.value)
                    }}
                    placeholder={props.placeholder || label}
                    disabled={field.disabled || props.disabled}
                />
            </label>
            {fieldState.error && !hideError && (
                <FieldError>{fieldState.error?.message}</FieldError>
            )}
        </fieldset>
    )
}
