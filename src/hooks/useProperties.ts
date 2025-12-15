import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Property, PropertyType } from '../types/database'

interface UsePropertiesOptions {
    type?: PropertyType
    city?: string
}

export function useProperties(options: UsePropertiesOptions = {}) {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProperties() {
            setLoading(true)
            setError(null)

            let query = supabase
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false })

            if (options.type) {
                query = query.eq('type', options.type)
            }

            if (options.city) {
                query = query.ilike('city', `%${options.city}%`)
            }

            const { data, error: fetchError } = await query

            if (fetchError) {
                setError(fetchError.message)
                setProperties([])
            } else {
                setProperties(data || [])
            }

            setLoading(false)
        }

        fetchProperties()
    }, [options.type, options.city])

    return { properties, loading, error }
}
