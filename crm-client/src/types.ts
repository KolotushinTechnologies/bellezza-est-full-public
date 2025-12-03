// Shared types for CRM

export interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  category: string
  tags: string[]
  inStock: number
  description?: string
  featured?: boolean
  createdAt?: string | Date
}

export interface Category {
  id: string
  name: string
  description?: string
  color?: string
}
