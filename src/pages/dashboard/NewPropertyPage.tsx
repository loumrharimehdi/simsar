import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, X, Loader2, AlertCircle } from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { useMyProperties } from '../../hooks/useMyProperties'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const CITIES = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 'Meknès', 'Oujda', 'Kénitra', 'Tétouan']

export function NewPropertyPage() {
    const navigate = useNavigate()
    const { createProperty } = useMyProperties()
    const { user } = useAuth()

    const [loading, setLoading] = useState(false)
    const [uploadingImages, setUploadingImages] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [images, setImages] = useState<string[]>([])

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        type: 'achat' as 'achat' | 'courte' | 'longue',
        city: 'Casablanca',
        bedrooms: '',
        bathrooms: '',
        surface: '',
        whatsapp_number: user?.user_metadata?.phone || '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploadingImages(true)
        const newImages: string[] = []

        for (const file of Array.from(files)) {
            const fileExt = file.name.split('.').pop()
            const fileName = `${user?.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('property-images')
                .upload(fileName, file)

            if (uploadError) {
                console.error('Upload error:', uploadError)
                continue
            }

            const { data: { publicUrl } } = supabase.storage
                .from('property-images')
                .getPublicUrl(fileName)

            newImages.push(publicUrl)
        }

        setImages(prev => [...prev, ...newImages])
        setUploadingImages(false)
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (images.length === 0) {
            setError('Veuillez ajouter au moins une photo')
            return
        }

        setLoading(true)

        const { error: createError } = await createProperty({
            title: formData.title,
            description: formData.description || undefined,
            price: parseInt(formData.price),
            type: formData.type,
            city: formData.city,
            bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
            bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
            surface: formData.surface ? parseInt(formData.surface) : undefined,
            images,
            whatsapp_number: formData.whatsapp_number,
        })

        if (createError) {
            setError(createError)
            setLoading(false)
        } else {
            navigate('/dashboard/annonces')
        }
    }

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Nouvelle annonce</h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Images */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50">
                        <h2 className="font-semibold text-gray-900 mb-4">Photos du bien</h2>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                            {images.map((url, index) => (
                                <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}

                            {/* Upload button */}
                            <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-[#FF6B35] flex flex-col items-center justify-center cursor-pointer transition-colors">
                                {uploadingImages ? (
                                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                                ) : (
                                    <>
                                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                                        <span className="text-xs text-gray-500">Ajouter</span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploadingImages}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-gray-500">Format recommandé : JPG, PNG. Max 5 MB par image.</p>
                    </div>

                    {/* Basic info */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 space-y-4">
                        <h2 className="font-semibold text-gray-900 mb-2">Informations générales</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'annonce *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                placeholder="Ex: Appartement 3 pièces vue mer"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent resize-none"
                                placeholder="Décrivez votre bien..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type d'annonce *</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                >
                                    <option value="achat">Vente</option>
                                    <option value="longue">Location longue durée</option>
                                    <option value="courte">Location courte durée</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                >
                                    {CITIES.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Prix (DH) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                placeholder="1500000"
                                required
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 space-y-4">
                        <h2 className="font-semibold text-gray-900 mb-2">Caractéristiques</h2>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Chambres</label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                    placeholder="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Salles de bain</label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                    placeholder="2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Surface (m²)</label>
                                <input
                                    type="number"
                                    name="surface"
                                    value={formData.surface}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                    placeholder="120"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50">
                        <h2 className="font-semibold text-gray-900 mb-4">Contact</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp *</label>
                            <input
                                type="tel"
                                name="whatsapp_number"
                                value={formData.whatsapp_number}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                placeholder="212612345678"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">Format international sans + (ex: 212612345678)</p>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Publication en cours...
                            </>
                        ) : (
                            'Publier l\'annonce'
                        )}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    )
}
