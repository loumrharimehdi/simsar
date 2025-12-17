import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useAuth } from '../contexts/AuthContext'
import type { Property, PropertyStatus } from '../types/database'

// Untyped client for new columns not in Database type
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseUntyped = createClient(supabaseUrl, supabaseAnonKey)

interface UseMyPropertiesReturn {
    properties: Property[]
    loading: boolean
    error: string | null
    createProperty: (data: CreatePropertyData) => Promise<{ error: string | null }>
    updateProperty: (id: string, data: UpdatePropertyData) => Promise<{ error: string | null }>
    deleteProperty: (id: string) => Promise<{ error: string | null }>
    updateStatus: (id: string, status: PropertyStatus) => Promise<{ error: string | null }>
    refetch: () => Promise<void>
}

interface CreatePropertyData {
    title: string
    description?: string
    price: number
    type: 'achat' | 'courte' | 'longue'
    city: string
    bedrooms?: number
    bathrooms?: number
    surface?: number
    images: string[]
    whatsapp_number: string
}

interface UpdatePropertyData extends Partial<CreatePropertyData> {
    status?: PropertyStatus
}

export function useMyProperties(): UseMyPropertiesReturn {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    const fetchProperties = async () => {
        if (!user) {
            setProperties([])
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabaseUntyped
            .from('properties')
            .select('*')
            .eq('professional_id', user.id)
            .order('created_at', { ascending: false })

        if (fetchError) {
            setError('Erreur lors du chargement des annonces')
            console.error(fetchError)
        } else {
            setProperties((data as Property[]) || [])
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchProperties()
    }, [user])

    const createProperty = async (data: CreatePropertyData) => {
        if (!user) return { error: 'Non authentifié' }

        const { error: insertError } = await supabaseUntyped
            .from('properties')
            .insert({
                ...data,
                professional_id: user.id,
                verified: false,
                status: 'active',
            })

        if (insertError) {
            console.error(insertError)
            return { error: 'Erreur lors de la création' }
        }

        await fetchProperties()
        return { error: null }
    }

    const updateProperty = async (id: string, data: UpdatePropertyData) => {
        if (!user) return { error: 'Non authentifié' }

        const { error: updateError } = await supabaseUntyped
            .from('properties')
            .update(data)
            .eq('id', id)
            .eq('professional_id', user.id)

        if (updateError) {
            console.error(updateError)
            return { error: 'Erreur lors de la mise à jour' }
        }

        await fetchProperties()
        return { error: null }
    }

    const deleteProperty = async (id: string) => {
        if (!user) return { error: 'Non authentifié' }

        const { error: deleteError } = await supabaseUntyped
            .from('properties')
            .delete()
            .eq('id', id)
            .eq('professional_id', user.id)

        if (deleteError) {
            console.error(deleteError)
            return { error: 'Erreur lors de la suppression' }
        }

        await fetchProperties()
        return { error: null }
    }

    const updateStatus = async (id: string, status: PropertyStatus) => {
        return updateProperty(id, { status })
    }

    return {
        properties,
        loading,
        error,
        createProperty,
        updateProperty,
        deleteProperty,
        updateStatus,
        refetch: fetchProperties,
    }
}
