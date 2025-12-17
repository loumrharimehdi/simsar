export type PropertyType = 'achat' | 'courte' | 'longue'
export type PropertyStatus = 'active' | 'paused' | 'sold'
export type ClientStatus = 'prospect' | 'negotiating' | 'closed_won' | 'closed_lost'
export type ClientSource = 'whatsapp' | 'call' | 'website' | 'other'
export type SubscriptionStatus = 'trial' | 'active' | 'expired'

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
    professional_id: string | null
    status: PropertyStatus
    created_at: string
}

export interface Professional {
    id: string
    email: string
    company_name: string
    phone: string
    city: string | null
    logo_url: string | null
    subscription_status: SubscriptionStatus
    subscription_ends_at: string | null
    created_at: string
}

export interface Client {
    id: string
    professional_id: string
    name: string
    phone: string
    email: string | null
    property_id: string | null
    status: ClientStatus
    notes: string | null
    source: ClientSource | null
    created_at: string
    updated_at: string
}

export interface Database {
    public: {
        Tables: {
            properties: {
                Row: Property
                Insert: Omit<Property, 'id' | 'created_at'>
                Update: Partial<Omit<Property, 'id' | 'created_at'>>
            }
            professionals: {
                Row: Professional
                Insert: Omit<Professional, 'id' | 'created_at'>
                Update: Partial<Omit<Professional, 'id' | 'created_at'>>
            }
            clients: {
                Row: Client
                Insert: Omit<Client, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Client, 'id' | 'created_at' | 'updated_at'>>
            }
        }
    }
}
