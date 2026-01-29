import { usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button, buttonStyles } from "@/components/ui/button"
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuLabel,
} from "@/components/ui/menu"
import {
  Navbar,
  NavbarGap,
  NavbarItem,
  NavbarMobile,
  NavbarProvider,
  NavbarSection,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
} from "@/components/ui/navbar"
import { Logo } from "@/components/logo"
import { ThemeSwitcher } from "@/components/theme-switcher"
import type { SharedData } from "@/types/shared"
import { Link } from "@/components/ui/link"
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline"

const navigations = [
  {
    name: "Beranda",
    textValue: "Beranda",
    href: "/",
  },
  {
    name: "Template",
    textValue: "Template",
    href: "/#categories",
  },
  {
    name: "Harga",
    textValue: "Harga",
    href: "/#pricing",
  },
  {
    name: "Testimoni",
    textValue: "Testimoni",
    href: "/#testimonials",
  },
]

export function AppNavbar({ children, ...props }: React.ComponentProps<typeof Navbar>) {
  const page = usePage()
  const { auth } = usePage<SharedData>().props
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => setIsOpen(false), [page.url])
  return (
    <NavbarProvider isOpen={isOpen} onOpenChange={setIsOpen}>
      <Navbar {...props}>
        <NavbarStart>
          <Link href="/" aria-label="Goto homepage">
            <Logo />
          </Link>
        </NavbarStart>
        <NavbarGap />

        <NavbarSection>
          {navigations.map((item) => (
            <NavbarItem isCurrent={item.href === page.url} key={item.href} href={item.href}>
              {item.name}
            </NavbarItem>
          ))}
          <NavbarItem target="_blank" href="https://intentui.com" className="justify-between">
            Documentation
          </NavbarItem>
          <NavbarItem target="_blank" href="https://design.intentui.com">
            Blocks
          </NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection className="ml-auto hidden gap-x-2 lg:flex">
          <ThemeSwitcher />
          {auth.user ? (
            <UserMenu />
          ) : (
            <>
              <NavbarItem href="/login">Masuk</NavbarItem>
              <Button asChild>
                <Link href="/register">Daftar Gratis</Link>
              </Button>
            </>
          )}
        </NavbarSection>
      </Navbar>
      <NavbarMobile>
        <NavbarTrigger />
        <NavbarSpacer />
        <NavbarSection>
          <ThemeSwitcher />
          {auth.user ? (
            <UserMenu />
          ) : (
            <>
              <NavbarItem href="/login">Masuk</NavbarItem>
              <Button size="sm" asChild>
                <Link href="/register">Daftar</Link>
              </Button>
            </>
          )}
        </NavbarSection>
      </NavbarMobile>
    </NavbarProvider>
  )
}

function UserMenu() {
  const { auth } = usePage<SharedData>().props
  return (
    <Menu>
      <Button size="sq-md" intent="plain" isCircle aria-label="Open menu">
        <Avatar src={auth.user.gravatar} size="sm" />
      </Button>
      <MenuContent placement="bottom end" className="sm:min-w-56">
        <MenuSection>
          <MenuHeader separator className="relative">
            <div>{auth.user.name}</div>
            <div className="truncate whitespace-nowrap pr-6 font-normal text-muted-fg text-sm">
              {auth.user.email}
            </div>
          </MenuHeader>
        </MenuSection>
        <MenuItem href="/dashboard">
          <MenuLabel>Dashboard</MenuLabel>
        </MenuItem>
        <MenuItem href="/settings/profile" className="justify-between">
          <MenuLabel>Update profile</MenuLabel>
        </MenuItem>
        <MenuItem href="/settings/password" className="justify-between">
          <MenuLabel>Change password</MenuLabel>
        </MenuItem>
        <MenuItem href="/settings/appearance" className="justify-between">
          <MenuLabel>Appearance</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem routerOptions={{ method: "post" }} href="/logout">
          <MenuLabel>Logout</MenuLabel>
          <ArrowRightEndOnRectangleIcon />
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
