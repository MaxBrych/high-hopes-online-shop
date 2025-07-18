"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Clock, User, Star, Play } from "lucide-react"
import Image from "next/image"

const mockGuides = [
  {
    id: 1,
    title: "Complete Beginner's Guide to Cannabis Growing",
    description: "Everything you need to know to start your first cannabis grow from seed to harvest",
    category: "Beginner",
    difficulty: "Easy",
    readTime: "15 min",
    rating: 4.9,
    author: "Master Grower",
    image: "/placeholder.svg?height=200&width=300&text=Beginner+Guide",
    tags: ["Indoor", "Soil", "Basics"],
  },
  {
    id: 2,
    title: "Advanced Hydroponic Systems Setup",
    description: "Master hydroponic growing with detailed setup instructions and troubleshooting tips",
    category: "Advanced",
    difficulty: "Hard",
    readTime: "25 min",
    rating: 4.7,
    author: "Hydro Expert",
    image: "/placeholder.svg?height=200&width=300&text=Hydroponic+Guide",
    tags: ["Hydroponic", "Advanced", "Systems"],
  },
  {
    id: 3,
    title: "LED Lighting for Maximum Yields",
    description: "Optimize your LED setup for different growth stages and maximize your harvest",
    category: "Equipment",
    difficulty: "Medium",
    readTime: "12 min",
    rating: 4.8,
    author: "Light Specialist",
    image: "/placeholder.svg?height=200&width=300&text=LED+Lighting",
    tags: ["Lighting", "LED", "Yields"],
  },
  {
    id: 4,
    title: "Nutrient Deficiency Identification Guide",
    description: "Learn to identify and fix common nutrient problems in cannabis plants",
    category: "Troubleshooting",
    difficulty: "Medium",
    readTime: "18 min",
    rating: 4.6,
    author: "Plant Doctor",
    image: "/placeholder.svg?height=200&width=300&text=Nutrient+Guide",
    tags: ["Nutrients", "Problems", "Health"],
  },
  {
    id: 5,
    title: "Autoflower Growing Techniques",
    description: "Specialized techniques for growing autoflowering cannabis strains successfully",
    category: "Strains",
    difficulty: "Medium",
    readTime: "20 min",
    rating: 4.5,
    author: "Auto Expert",
    image: "/placeholder.svg?height=200&width=300&text=Autoflower+Guide",
    tags: ["Autoflower", "Techniques", "Timing"],
  },
  {
    id: 6,
    title: "Harvest and Curing Best Practices",
    description: "Perfect timing and techniques for harvesting and curing your cannabis",
    category: "Harvest",
    difficulty: "Medium",
    readTime: "22 min",
    rating: 4.9,
    author: "Harvest Master",
    image: "/placeholder.svg?height=200&width=300&text=Harvest+Guide",
    tags: ["Harvest", "Curing", "Quality"],
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    case "Hard":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function GuidesContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-brand-dark mb-2">Growing Guides</h2>
        <p className="text-brand-dark/70">Learn cannabis cultivation with expert guides and tutorials</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search guides..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
            <SelectItem value="strains">Strains</SelectItem>
            <SelectItem value="harvest">Harvest</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured Guide */}
      <Card className="border border-brand-dark/10 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <Image
              src="/placeholder.svg?height=200&width=300&text=Featured+Guide"
              alt="Featured Guide"
              width={300}
              height={200}
              className="rounded-lg object-cover lg:w-80"
            />
            <div className="flex-1 space-y-4">
              <div>
                <Badge className="bg-primary text-white mb-2">Featured</Badge>
                <h3 className="text-xl font-medium text-brand-dark mb-2">Complete Cannabis Growing Masterclass</h3>
                <p className="text-brand-dark/70">
                  Our most comprehensive guide covering everything from seed selection to harvest. Perfect for both
                  beginners and experienced growers looking to improve their yields.
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-brand-dark/60">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>45 min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9 rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Expert Level</span>
                </div>
              </div>
              <Button className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Start Reading
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGuides.map((guide) => (
          <Card key={guide.id} className="border border-brand-dark/10 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Image
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.title}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <Badge className="absolute top-2 left-2 bg-white/90 text-brand-dark">{guide.category}</Badge>
                <Badge className={`absolute top-2 right-2 ${getDifficultyColor(guide.difficulty)}`}>
                  {guide.difficulty}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-brand-dark line-clamp-2 mb-2">{guide.title}</h3>
                  <p className="text-sm text-brand-dark/60 line-clamp-3">{guide.description}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-brand-dark/60">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{guide.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{guide.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{guide.author}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {guide.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockGuides.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-brand-dark/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-dark mb-2">No guides found</h3>
          <p className="text-brand-dark/60 mb-4">Try adjusting your search or filters</p>
          <Button variant="outline">Clear Filters</Button>
        </div>
      )}
    </div>
  )
}
