import { ModeToggle } from '~/components/theme-toggle'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarProvider,
    SidebarTrigger
} from '~/components/ui/sidebar'

export default function DashboardLayout(props: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col gap-5 w-full">
                <SidebarTrigger />
                {props.children}
            </main>
        </SidebarProvider>
    )
}

function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarContent>
                    <ModeToggle />
                </SidebarContent>
            </SidebarFooter>
        </Sidebar>
    )
}
