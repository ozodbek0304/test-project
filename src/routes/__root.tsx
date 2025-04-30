import { Outlet, createRootRoute } from "@tanstack/react-router"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/layouts/theme"
import { ConfirmProvider } from "@/layouts/confirm"
import { PromptProvider } from "@/layouts/prompt"
import { PromptWithCauseProvider } from "@/layouts/prompt-with-causer"
import ThemeDataProvider from "@/layouts/color"
import { ViewProvider } from "@/layouts/view"

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="theme">
            <ThemeDataProvider>
                <ConfirmProvider>
                    <PromptProvider>
                        <PromptWithCauseProvider>
                            <ViewProvider>
                                <Outlet />
                            </ViewProvider>
                        </PromptWithCauseProvider>
                    </PromptProvider>
                </ConfirmProvider>
                <Toaster position="top-right" />
            </ThemeDataProvider>
        </ThemeProvider>
    )
}
