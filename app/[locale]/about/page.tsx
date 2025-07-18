import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Leaf, Award, Users, Globe, Shield, Sprout, Truck, Clock } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us | Premium Cannabis Seeds & Growing Supplies",
  description:
    "Learn about our mission to provide premium cannabis seeds and professional growing equipment. Discover our story, values, and commitment to cultivation excellence.",
}

const stats = [
  {
    icon: Users,
    number: "15,000+",
    label: "Successful Growers",
  },
  {
    icon: Award,
    number: "8+",
    label: "Years Experience",
  },
  {
    icon: Leaf,
    number: "200+",
    label: "Seed Varieties",
  },
  {
    icon: Globe,
    number: "35+",
    label: "Countries Served",
  },
]

const values = [
  {
    icon: Shield,
    title: "Genetic Quality",
    description: "Every seed is carefully selected from proven genetics with high germination rates and stable traits.",
  },
  {
    icon: Sprout,
    title: "Growing Support",
    description: "Expert cultivation guidance and support to help you achieve successful harvests every time.",
  },
  {
    icon: Leaf,
    title: "Sustainable Growing",
    description: "We promote eco-friendly cultivation practices and organic growing methods for better results.",
  },
  {
    icon: Truck,
    title: "Discreet Delivery",
    description: "Fast, secure, and completely discreet shipping worldwide with stealth packaging guaranteed.",
  },
]

const team = [
  {
    name: "Marcus Thompson",
    role: "Master Breeder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Cannabis genetics expert with 15+ years of breeding experience and multiple award-winning strains.",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Cultivation",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Professional grower specializing in hydroponic systems and indoor cultivation optimization.",
  },
  {
    name: "David Chen",
    role: "Growing Consultant",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Cultivation specialist helping growers maximize yields through proper techniques and equipment.",
  },
]

const timeline = [
  {
    year: "2016",
    title: "Seeds & Genetics Founded",
    description: "Started as a small seed bank focused on preserving rare cannabis genetics and stable breeding lines.",
  },
  {
    year: "2017",
    title: "Breeding Program Launch",
    description: "Established our professional breeding facility and began developing our signature strain collection.",
  },
  {
    year: "2018",
    title: "Equipment Expansion",
    description: "Added professional growing equipment and hydroponic systems to serve complete cultivation needs.",
  },
  {
    year: "2019",
    title: "International Growth",
    description:
      "Expanded shipping to 25+ countries and established partnerships with leading equipment manufacturers.",
  },
  {
    year: "2021",
    title: "Award Recognition",
    description: "Our genetics won multiple Cannabis Cup awards and gained recognition in the growing community.",
  },
  {
    year: "2024",
    title: "Cultivation Education",
    description: "Launched comprehensive growing guides and consultation services for new and experienced growers.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
          ]}
        />

        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-medium text-brand-dark leading-tight">
                Your Trusted Partner in
                <br />
                <span className="text-brand-green">Cannabis Cultivation</span>
              </h1>
              <p className="text-lg text-brand-dark/70 font-light leading-relaxed">
                We're passionate about providing premium cannabis seeds and professional growing equipment that help
                cultivators achieve exceptional harvests. Our carefully selected genetics and cultivation supplies are
                trusted by growers worldwide.
              </p>
              <p className="text-brand-dark/70 font-light leading-relaxed">
                Every seed is tested for germination and genetic stability, ensuring you receive only the finest
                genetics. We believe in supporting the growing community with quality products, expert guidance, and
                cultivation education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green-dark text-white">
                  <Link href="/collections/all">Shop Seeds & Equipment</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-brand-dark/20 text-brand-dark bg-transparent hover:bg-brand-green/5"
                >
                  <Link href="#contact">Growing Support</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-brand-light/50">
                <Image
                  src="/images/natural-growing.png"
                  alt="Professional cannabis cultivation setup"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-green/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-green/5 rounded-full blur-2xl"></div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-brand-light/30 rounded-3xl mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-brand-green" />
                </div>
                <div className="text-3xl md:text-4xl font-medium text-brand-dark mb-2">{stat.number}</div>
                <div className="text-brand-dark/70 font-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-brand-dark mb-4">Our Growing Philosophy</h2>
            <p className="text-brand-dark/70 font-light max-w-2xl mx-auto">
              These principles guide everything we do, from seed selection to cultivation support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-brand-green" />
                  </div>
                  <h3 className="text-lg font-medium text-brand-dark mb-3">{value.title}</h3>
                  <p className="text-brand-dark/70 font-light text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-brand-dark mb-4">Meet Our Growing Experts</h2>
            <p className="text-brand-dark/70 font-light max-w-2xl mx-auto">
              Passionate cultivators and breeders dedicated to bringing you the finest genetics and growing expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-brand-dark mb-1">{member.name}</h3>
                  <p className="text-brand-green font-light mb-3">{member.role}</p>
                  <p className="text-brand-dark/70 font-light text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-brand-dark mb-4">Our Cultivation Journey</h2>
            <p className="text-brand-dark/70 font-light max-w-2xl mx-auto">
              From small seed bank to trusted name in cannabis genetics and growing equipment.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-medium text-brand-green">{item.year}</span>
                      <h3 className="text-xl font-medium text-brand-dark">{item.title}</h3>
                    </div>
                    <p className="text-brand-dark/70 font-light leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-brand-light/30 rounded-3xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-medium text-brand-dark mb-4">Need Growing Advice?</h2>
            <p className="text-brand-dark/70 font-light mb-8 max-w-2xl mx-auto">
              Have questions about genetics, growing techniques, or equipment selection? Our cultivation experts are
              here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green-dark text-white">
                <Link href="mailto:grow@seedstore.com">Growing Support</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-brand-dark/20 text-brand-dark bg-transparent hover:bg-brand-green/5"
              >
                <Link href="/collections/all">Browse Seeds & Equipment</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
