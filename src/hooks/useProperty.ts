import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Property } from '../types/database'

export function useProperty(id: string | undefined) {
    const [property, setProperty] = useState<Property | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) {
            setLoading(false)
            return
        }

        const fetchProperty = async () => {
            setLoading(true)
            setError(null)

            const { data, error: fetchError } = await supabase
                .from('properties')
                .select('*')
                .eq('id', id)
                .single()

            if (fetchError) {
                setError(fetchError.message)
                setProperty(null)
            } else {
                setProperty(data)
            }

            setLoading(false)
        }

        fetchProperty()
    }, [id])

    return { property, loading, error }
}
