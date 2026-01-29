import { Flash } from "@/components/flash"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
  SidebarTrigger,
  SidebarInset,
  SidebarLabel,
} from "@/components/ui/sidebar"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  MenuHeader,
  MenuSection,
} from "@/components/ui/menu"
import { Logo } from "@/components/logo"
import { Avatar } from "@/components/ui/avatar"
import { usePage } from "@inertiajs/react"
import type { SharedData } from "@/types/shared"
import type { PropsWithChildren } from "react"
import {
  HomeIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightEndOnRectangleIcon,
  ChevronUpDownIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"

export default function AppLayout({ children }: PropsWithChildren) {
  const { auth } = usePage<SharedData>().props
  const currentUrl = usePage().url

  return (
    <SidebarProvider defaultOpen={true}>
      <Flash />
      <div className="flex h-screen w-full">
        <Sidebar side="left" collapsible="dock" intent="inset">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-3">
              <Logo />
              <SidebarLabel>
                <span className="text-lg font-semibold">VEAST</span>
              </SidebarLabel>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarSection label="Menu">
              <SidebarItem href="/dashboard" isCurrent={currentUrl === "/dashboard"}>
                <HomeIcon className="size-5" />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection label="Settings">
              <SidebarItem href="/settings/profile" isCurrent={currentUrl.startsWith("/settings/profile")}>
                <UserCircleIcon className="size-5" />
                <SidebarLabel>Profile</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/settings/password" isCurrent={currentUrl.startsWith("/settings/password")}>
                <Cog6ToothIcon className="size-5" />
                <SidebarLabel>Password</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/settings/appearance" isCurrent={currentUrl.startsWith("/settings/appearance")}>
                <Cog6ToothIcon className="size-5" />
                <SidebarLabel>Appearance</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarContent>

          <SidebarFooter className="flex flex-row justify-between gap-4 group-data-[state=collapsed]:flex-col">
            <Menu>
              <MenuTrigger className="flex w-full items-center justify-between" aria-label="Profile">
                <div className="flex items-center gap-x-2">
                  <Avatar
                    className="size-8 *:size-8 group-data-[state=collapsed]:size-6 group-data-[state=collapsed]:*:size-6"
                    src={auth.user.gravatar}
                  />
                  <div className="in-data-[collapsible=dock]:hidden text-sm">
                    <SidebarLabel>{auth.user.name}</SidebarLabel>
                    <span className="-mt-0.5 block text-muted-fg">{auth.user.email}</span>
                  </div>
                </div>
                <ChevronUpDownIcon data-slot="chevron" />
              </MenuTrigger>
              <MenuContent
                className="in-data-[sidebar-collapsible=collapsed]:min-w-56 min-w-(--trigger-width)"
                placement="top right"
              >
                <MenuSection>
                  <MenuHeader separator>
                    <span className="block">{auth.user.name}</span>
                    <span className="font-normal text-muted-fg">{auth.user.email}</span>
                  </MenuHeader>
                </MenuSection>

                <MenuItem href="/dashboard">
                  <HomeIcon />
                  Dashboard
                </MenuItem>
                <MenuItem href="/settings/profile">
                  <UserCircleIcon />
                  Profile Settings
                </MenuItem>
                <MenuItem href="/settings/password">
                  <Cog6ToothIcon />
                  Change Password
                </MenuItem>
                <MenuItem href="/settings/appearance">
                  <Cog6ToothIcon />
                  Appearance
                </MenuItem>
                <MenuSeparator />
                <MenuItem href="/settings/delete-account">
                  <ShieldCheckIcon />
                  Security & Privacy
                </MenuItem>
                <MenuSeparator />
                <MenuItem routerOptions={{ method: "post" }} href="/logout">
                  <ArrowRightEndOnRectangleIcon />
                  Log out
                </MenuItem>
              </MenuContent>
            </Menu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
          </div>

          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
