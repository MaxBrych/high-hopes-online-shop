"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Plus, Sprout, Scissors, Droplets, Sun } from "lucide-react"

const mockEvents = [
  {
    id: 1,
    title: "White Widow - Flowering Week 6",
    date: "2024-01-20",
    type: "milestone",
    grow: "White Widow Indoor #1",
    description: "Check trichomes, consider harvest timing",
  },
  {
    id: 2,
    title: "Northern Lights - Nutrient Change",
    date: "2024-01-22",
    type: "feeding",
    grow: "Northern Lights Auto #2",
    description: "Switch to flowering nutrients",
  },
  {
    id: 3,
    title: "New Grow - Germination",
    date: "2024-01-25",
    type: "planting",
    grow: "Gorilla Glue #4 Indoor",
    description: "Start germination process for new seeds",
  },
  {
    id: 4,
    title: "White Widow - Harvest Window",
    date: "2024-02-01",
    type: "harvest",
    grow: "White Widow Indoor #1",
    description: "Optimal harvest window begins",
  },
]

const getEventColor = (type: string) => {
  switch (type) {
    case "planting":
      return "bg-green-100 text-green-800"
    case "feeding":
      return "bg-blue-100 text-blue-800"
    case "milestone":
      return "bg-purple-100 text-purple-800"
    case "harvest":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getEventIcon = (type: string) => {
  switch (type) {
    case "planting":
      return Sprout
    case "feeding":
      return Droplets
    case "milestone":
      return Sun
    case "harvest":
      return Scissors
    default:
      return Calendar
  }
}

export function CalendarContent() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium text-brand-dark mb-2">Growing Calendar</h2>
          <p className="text-brand-dark/70">Plan and track your cultivation schedule</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-brand-dark/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Sprout className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-brand-dark/60">Active Grows</p>
                <p className="text-lg font-medium text-brand-dark">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-brand-dark/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-brand-dark/60">This Week</p>
                <p className="text-lg font-medium text-brand-dark">4 Events</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-brand-dark/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Scissors className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-brand-dark/60">Next Harvest</p>
                <p className="text-lg font-medium text-brand-dark">12 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-brand-dark/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Sun className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-brand-dark/60">Avg Cycle</p>
                <p className="text-lg font-medium text-brand-dark">14 weeks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="border border-brand-dark/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.map((event) => {
              const IconComponent = getEventIcon(event.type)
              return (
                <div key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border">
                    <IconComponent className="h-5 w-5 text-brand-dark/60" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-medium text-brand-dark">{event.title}</h4>
                        <p className="text-sm text-brand-dark/60 mt-1">{event.description}</p>
                        <p className="text-sm text-brand-dark/50 mt-1">Grow: {event.grow}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getEventColor(event.type)}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                        <p className="text-sm text-brand-dark/60 mt-1">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View Placeholder */}
      <Card className="border border-brand-dark/10">
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-brand-dark/30 mx-auto mb-4" />
              <p className="text-brand-dark/60">Calendar view coming soon</p>
              <p className="text-sm text-brand-dark/50">Visual calendar with drag & drop scheduling</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
