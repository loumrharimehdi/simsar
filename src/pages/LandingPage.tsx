import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { Footer } from '../components/Footer'
import { SEO } from '../components/SEO'

export function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <SEO />
            <Navbar />
            <main className="flex-1">
                <Hero />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    )
}
