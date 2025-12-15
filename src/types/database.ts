export type PropertyType = 'achat' | 'courte' | 'longue'

export interface Property {
    id: string
    title: string
    description: string | null
    price: number
    type: PropertyType
    city: string
    bedrooms: number | null
    bathrooms: number | null
    surface: number | null
    images: string[]
    whatsapp_number: string
    verified: boolean
    created_at: string
}

export interface Database {
    public: {
        Tables: {
            properties: {
                Row: Property
                Insert: Omit<Property, 'id' | 'created_at'>
                Update: Partial<Omit<Property, 'id' | 'created_at'>>
            }
        }
    }
}
