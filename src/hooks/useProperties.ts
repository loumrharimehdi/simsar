import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Property, PropertyType } from '../types/database'

const PAGE_SIZE = 9

interface UsePropertiesOptions {
    type?: PropertyType
    city?: string
}

export function useProperties(options: UsePropertiesOptions = {}) {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)

    const fetchProperties = useCallback(async (pageNum: number, append: boolean = false) => {
        if (append) {
            setLoadingMore(true)
        } else {
            setLoading(true)
            setProperties([])
        }
        setError(null)

        let query = supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false })
            .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1)

        if (options.type) {
            query = query.eq('type', options.type)
        }

        if (options.city) {
            query = query.ilike('city', `%${options.city}%`)
        }

        const { data, error: fetchError } = await query

        if (fetchError) {
            setError(fetchError.message)
            if (!append) setProperties([])
        } else {
            const newData = data || []
            if (append) {
                setProperties(prev => [...prev, ...newData])
            } else {
                setProperties(newData)
            }
            setHasMore(newData.length === PAGE_SIZE)
        }

        setLoading(false)
        setLoadingMore(false)
    }, [options.type, options.city])

    useEffect(() => {
        setPage(0)
        fetchProperties(0, false)
    }, [options.type, options.city, fetchProperties])

    const loadMore = useCallback(() => {
        if (!loadingMore && hasMore) {
            const nextPage = page + 1
            setPage(nextPage)
            fetchProperties(nextPage, true)
        }
    }, [page, loadingMore, hasMore, fetchProperties])

    return { properties, loading, loadingMore, error, hasMore, loadMore }
}
