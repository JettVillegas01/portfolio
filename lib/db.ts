import { supabase } from "./supabase"

// ─── Supabase Storage Helper ──────────────────────────────────────────────────

const PROJECT_ID = "kmfqxxihiovxhjmzwvtl"
const BUCKET_NAME = "portfolio"
const STORAGE_BASE_URL = `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${BUCKET_NAME}`

const formatImageUrl = (path: string, folder: string) => {
  if (!path) return ""
  if (path.startsWith("http")) return path
  const fileName = path.split("/").pop()
  return `${STORAGE_BASE_URL}/${folder}/${fileName}`
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Certificate {
  id: string
  title: string
  issuer: string
  date_issued: string
  image_url: string
}

export interface GalleryImage {
  id: number
  src: string
  title: string
  location: string
  description: string
  sort_order: number
}

export interface Project {
  id: string
  title: string
  description: string
  long_description: string
  image_url: string
  link?: string
  tags: string[]
  tech_stack: string[]
  frameworks: string[]
}

export interface Skill {
  id: string
  slug: string
  title: string
  level: number
  description: string
  tags: string[]
  category: "frontend" | "backend" | "other"
}

export interface Feedback {
  id: string
  name: string
  role: string
  comment: string
  rating: number
  date_text: string
  initials: string
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export async function getCertificates(): Promise<Certificate[]> {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching certificates:", error.message, error.details)
    return []
  }
  return (data ?? []).map((cert) => ({
    ...cert,
    image_url: formatImageUrl(cert.image_url, "certificates"),
  }))
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("Error fetching gallery:", error.message, error.details)
    return []
  }
  return (data ?? []).map((img) => ({
    ...img,
    src: formatImageUrl(img.src, "gallery"),
  }))
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }
  return data ?? []
}

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching skills:", error)
    return []
  }
  return data ?? []
}

export async function getFeedbacks(): Promise<Feedback[]> {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching feedbacks:", error)
    return []
  }
  return data ?? []
}