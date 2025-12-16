import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { Stats } from '../components/Stats'
import { PopularCities } from '../components/PopularCities'
import { Testimonials } from '../components/Testimonials'
import { FAQ } from '../components/FAQ'
import { CTASection } from '../components/CTASection'
import { Footer } from '../components/Footer'
import { SEO } from '../components/SEO'

export function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <SEO />
            <Navbar />
            <main id="main-content" className="flex-1">
                <Hero />
                <HowItWorks />
                <Stats />
                <PopularCities />
                <Testimonials />
                <FAQ />
                <CTASection />
            </main>
            <Footer />
        </div>
    )
}

