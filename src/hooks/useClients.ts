import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useAuth } from '../contexts/AuthContext'
import type { Client, ClientStatus, ClientSource } from '../types/database'

// Untyped client for new tables not in Database type
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseUntyped = createClient(supabaseUrl, supabaseAnonKey)

interface UseClientsReturn {
    clients: Client[]
    loading: boolean
    error: string | null
    createClient: (data: CreateClientData) => Promise<{ error: string | null }>
    updateClient: (id: string, data: UpdateClientData) => Promise<{ error: string | null }>
    deleteClient: (id: string) => Promise<{ error: string | null }>
    refetch: () => Promise<void>
}

interface CreateClientData {
    name: string
    phone: string
    email?: string
    property_id?: string
    status?: ClientStatus
    notes?: string
    source?: ClientSource
}

interface UpdateClientData extends Partial<CreateClientData> { }

export function useClients(): UseClientsReturn {
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    const fetchClients = async () => {
        if (!user) {
            setClients([])
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabaseUntyped
            .from('clients')
            .select('*')
            .eq('professional_id', user.id)
            .order('created_at', { ascending: false })

        if (fetchError) {
            setError('Erreur lors du chargement des clients')
            console.error(fetchError)
        } else {
            setClients((data as Client[]) || [])
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchClients()
    }, [user])

    const createClientRecord = async (data: CreateClientData) => {
        if (!user) return { error: 'Non authentifié' }

        const { error: insertError } = await supabaseUntyped
            .from('clients')
            .insert({
                ...data,
                professional_id: user.id,
                status: data.status || 'prospect',
            })

        if (insertError) {
            console.error(insertError)
            return { error: 'Erreur lors de la création' }
        }

        await fetchClients()
        return { error: null }
    }

    const updateClient = async (id: string, data: UpdateClientData) => {
        if (!user) return { error: 'Non authentifié' }

        const { error: updateError } = await supabaseUntyped
            .from('clients')
            .update({
                ...data,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .eq('professional_id', user.id)

        if (updateError) {
            console.error(updateError)
            return { error: 'Erreur lors de la mise à jour' }
        }

        await fetchClients()
        return { error: null }
    }

    const deleteClient = async (id: string) => {
        if (!user) return { error: 'Non authentifié' }

        const { error: deleteError } = await supabaseUntyped
            .from('clients')
            .delete()
            .eq('id', id)
            .eq('professional_id', user.id)

        if (deleteError) {
            console.error(deleteError)
            return { error: 'Erreur lors de la suppression' }
        }

        await fetchClients()
        return { error: null }
    }

    return {
        clients,
        loading,
        error,
        createClient: createClientRecord,
        updateClient,
        deleteClient,
        refetch: fetchClients,
    }
}
