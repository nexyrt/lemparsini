import PublicLayout from "@/layouts/public-layout"
import { Head, Link } from "@inertiajs/react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  SparklesIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  LinkIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  PaintBrushIcon,
  BellAlertIcon,
  StarIcon,
  CheckBadgeIcon,
  RocketLaunchIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline"

interface Category {
  id: number
  name: string
  slug: string
  description: string
  icon: string
}

interface Template {
  id: number
  name: string
  slug: string
  description: string
  preview_image: string
  demo_url: string
  price: number
  is_free: boolean
  is_premium: boolean
  features: string[]
}

interface HomeProps {
  categories: Category[]
  featuredTemplates: Template[]
}

export default function Home({ categories, featuredTemplates }: HomeProps) {
  return (
    <>
      <Head title="lemparsini.com - Undangan Digital Modern & Elegan" />
