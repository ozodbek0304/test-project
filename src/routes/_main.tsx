import Header from "@/components/header"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_main")({
    component: MainLayout,
})

function MainLayout() {
    return (
        <>
            <div className="fixed top-0 w-full bg-background z-50">
                <Header />
            </div>
            <main className="px-4 md:px-6  pt-4 md:pt-6 mt-[72px] relative">
                <div className="w-full" suppressHydrationWarning>
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default MainLayout
