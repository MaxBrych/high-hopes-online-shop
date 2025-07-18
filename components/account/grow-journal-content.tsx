"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sprout, Plus, Calendar, Thermometer, Droplets, Sun, Eye } from "lucide-react"
import Image from "next/image"

const mockGrows = [
  {
    id: 1,
    name: "White Widow Indoor #1",
    strain: "White Widow Feminized",
    stage: "flowering",
    week: 6,
    startDate: "2024-01-01",
    expectedHarvest: "2024-03-15",
    environment: {
      temperature: 24,
      humidity: 55,
      ph: 6.2,
      light: "18/6",
    },
    image: "/placeholder.svg?height=200&width=300&text=White+Widow+Grow",
    notes: "Plants looking healthy, trichomes starting to develop nicely",
  },
  {
    id: 2,
    name: "Northern Lights Auto #2",
    strain: "Northern Lights Auto",
    stage: "vegetative",
    week: 3,
    startDate: "2024-01-15",
    expectedHarvest: "2024-04-01",
    environment: {
      temperature: 22,
      humidity: 65,
      ph: 6.0,
      light: "20/4",
    },
    image: "/placeholder.svg?height=200&width=300&text=Northern+Lights+Grow",
    notes: "Strong growth, considering LST training next week",
  },
  {
    id: 3,
    name: "Gorilla Glue Outdoor",
    strain: "Gorilla Glue #4",
    stage: "completed",
    week: 12,
    startDate: "2023-10-01",
    expectedHarvest: "2023-12-20",
    environment: {
      temperature: 20,
      humidity: 45,
      ph: 6.5,
      light: "Natural",
    },
    image: "/placeholder.svg?height=200&width=300&text=Gorilla+Glue+Harvest",
    notes: "Harvest completed! Final yield: 85g dry weight",
  },
]

const getStageColor = (stage: string) => {
  switch (stage) {
    case "seedling":
      return "bg-green-100 text-green-800"
    case "vegetative":
      return "bg-blue-100 text-blue-800"
    case "flowering":
      return "bg-purple-100 text-purple-800"
    case "completed":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function GrowJournalContent() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium text-brand-dark mb-2">Grow Journal</h2>
          <p className="text-brand-dark/70">Track your cannabis cultivation journey</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Start New Grow
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input placeholder="Search grows..." className="pl-4" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="seedling">Seedling</SelectItem>
            <SelectItem value="vegetative">Vegetative</SelectItem>
            <SelectItem value="flowering">Flowering</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockGrows.map((grow) => (
          <Card key={grow.id} className="border border-brand-dark/10">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">{grow.name}</CardTitle>
                  <p className="text-sm text-brand-dark/60">{grow.strain}</p>
                </div>
                <Badge className={getStageColor(grow.stage)}>
                  {grow.stage.charAt(0).toUpperCase() + grow.stage.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                src={grow.image || "/placeholder.svg"}
                alt={grow.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-lg"
              />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-brand-dark/60" />
                  <span>Week {grow.week}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-brand-dark/60" />
                  <span>{grow.environment.temperature}°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-brand-dark/60" />
                  <span>{grow.environment.humidity}% RH</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-brand-dark/60" />
                  <span>{grow.environment.light}</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-brand-dark/80">{grow.notes}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {grow.stage !== "completed" && (
                  <Button size="sm" className="flex-1">
                    Add Entry
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockGrows.length === 0 && (
        <div className="text-center py-12">
          <Sprout className="h-12 w-12 text-brand-dark/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-dark mb-2">No grows yet</h3>
          <p className="text-brand-dark/60 mb-4">Start tracking your first cannabis grow!</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Start New Grow
          </Button>
        </div>
      )}
    </div>
  )
}
