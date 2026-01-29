import { Flash } from "@/components/flash"
import { Footer } from "@/components/footer"
import { AppNavbar } from "@/layouts/app-navbar"
import type { PropsWithChildren } from "react"

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Flash />
      <AppNavbar />
      {children}
      <Footer />
    </div>
  )
}
