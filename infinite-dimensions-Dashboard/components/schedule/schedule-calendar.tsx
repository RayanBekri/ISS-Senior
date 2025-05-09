"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { ChevronLeft, ChevronRight, Clock, Users, MapPin, Plus, CalendarIcon } from "lucide-react"
import { format, addDays, isSameDay, startOfWeek, addWeeks, subWeeks } from "date-fns"

// Sample meeting data
const initialMeetings = [
  {
    id: 1,
    title: "Client Consultation - ABC Corp",
    date: new Date(2023, 3, 15),
    startTime: "10:00",
    endTime: "11:30",
    client: "ABC Corporation",
    location: "Main Office - Conference Room A",
    description: "Initial consultation for 3D printing project requirements",
    type: "consultation",
  },
  {
    id: 2,
    title: "Project Review - XYZ Ltd",
    date: new Date(2023, 3, 17),
    startTime: "14:00",
    endTime: "15:00",
    client: "XYZ Limited",
    location: "Virtual Meeting",
    description: "Review 3D model prototypes and discuss modifications",
    type: "review",
  },
  {
    id: 3,
    title: "Product Delivery - TechPrint",
    date: new Date(2023, 3, 20),
    startTime: "11:00",
    endTime: "12:00",
    client: "TechPrint Solutions",
    location: "Client Office",
    description: "Deliver completed 3D printed components and provide usage instructions",
    type: "delivery",
  },
]

// Generate dates for the week view
const generateWeekDays = (startDate: Date) => {
  const days = []
  for (let i = 0; i < 7; i++) {
    days.push(addDays(startDate, i))
  }
  return days
}

export default function ScheduleCalendar() {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [weekStartDate, setWeekStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [weekDays, setWeekDays] = useState(generateWeekDays(weekStartDate))
  const [meetings, setMeetings] = useState(initialMeetings)
  const [isAddMeetingOpen, setIsAddMeetingOpen] = useState(false)
  const [isViewMeetingOpen, setIsViewMeetingOpen] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null)

  // New meeting form state
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: new Date(),
    startTime: "09:00",
    endTime: "10:00",
    client: "",
    location: "",
    description: "",
    type: "consultation", // Default type
  })

  // Update week days when week start date changes
  useEffect(() => {
    setWeekDays(generateWeekDays(weekStartDate))
  }, [weekStartDate])

  // Navigate to previous week
  const goToPreviousWeek = () => {
    setWeekStartDate(subWeeks(weekStartDate, 1))
  }

  // Navigate to next week
  const goToNextWeek = () => {
    setWeekStartDate(addWeeks(weekStartDate, 1))
  }

  // Navigate to today
  const goToToday = () => {
    const today = new Date()
    setSelectedDate(today)
    setWeekStartDate(startOfWeek(today, { weekStartsOn: 1 }))
  }

  // Get meetings for the selected date
  const getMeetingsForDate = (date: Date) => {
    return meetings.filter((meeting) => isSameDay(new Date(meeting.date), date))
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  // Handle add meeting form change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewMeeting((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setNewMeeting((prev) => ({ ...prev, [name]: value }))
  }

  // Handle add meeting
  const handleAddMeeting = () => {
    const id = meetings.length > 0 ? Math.max(...meetings.map((m) => m.id)) + 1 : 1

    setMeetings((prev) => [
      ...prev,
      {
        ...newMeeting,
        id,
        date: selectedDate,
      },
    ])

    toast({
      title: "Meeting Added",
      description: `${newMeeting.title} has been scheduled successfully.`,
    })

    // Reset form and close dialog
    setNewMeeting({
      title: "",
      date: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      client: "",
      location: "",
      description: "",
      type: "consultation",
    })
    setIsAddMeetingOpen(false)
  }

  // Handle view meeting
  const handleViewMeeting = (meeting: any) => {
    setSelectedMeeting(meeting)
    setIsViewMeetingOpen(true)
  }

  // Handle delete meeting
  const handleDeleteMeeting = () => {
    if (selectedMeeting) {
      setMeetings((prev) => prev.filter((meeting) => meeting.id !== selectedMeeting.id))
      toast({
        title: "Meeting Deleted",
        description: `${selectedMeeting.title} has been removed from your schedule.`,
      })
      setIsViewMeetingOpen(false)
      setSelectedMeeting(null)
    }
  }

  // Get badge color based on meeting type
  const getMeetingTypeBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Consultation
          </Badge>
        )
      case "review":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
            Review
          </Badge>
        )
      case "delivery":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Delivery
          </Badge>
        )
      default:
        return <Badge variant="outline">Other</Badge>
    }
  }

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
      {/* Calendar Navigation */}
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Calendar</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={goToNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Horizontal Calendar */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day, index) => {
              const isSelected = isSameDay(day, selectedDate)
              const hasMeetings = getMeetingsForDate(day).length > 0

              return (
                <div key={index} className="text-center">
                  <div className="mb-1 text-xs text-muted-foreground">{format(day, "EEE")}</div>
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full h-12 ${isSelected ? "" : "hover:bg-accent hover:text-accent-foreground"}`}
                    onClick={() => handleDateSelect(day)}
                  >
                    <div className="flex flex-col items-center">
                      <span className={`text-sm ${isSelected ? "font-bold" : ""}`}>{format(day, "d")}</span>
                      {hasMeetings && (
                        <div
                          className={`w-1 h-1 rounded-full mt-1 ${isSelected ? "bg-primary-foreground" : "bg-primary"}`}
                        ></div>
                      )}
                    </div>
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Day Details */}
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle>{format(selectedDate, "EEEE, MMMM d, yyyy")}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {getMeetingsForDate(selectedDate).length} meetings scheduled
            </p>
          </div>
          <Button onClick={() => setIsAddMeetingOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Meeting
          </Button>
        </CardHeader>
        <CardContent>
          {getMeetingsForDate(selectedDate).length > 0 ? (
            <div className="space-y-3">
              {getMeetingsForDate(selectedDate).map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-4 border rounded-lg hover:bg-accent hover:cursor-pointer transition-colors"
                  onClick={() => handleViewMeeting(meeting)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{meeting.title}</h3>
                    {getMeetingTypeBadge(meeting.type)}
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>
                        {meeting.startTime} - {meeting.endTime}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{meeting.client}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{meeting.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
              <h3 className="mt-4 text-lg font-medium">No meetings scheduled</h3>
              <p className="mt-2 text-sm text-muted-foreground">Add a new meeting to get started with your schedule.</p>
              <Button onClick={() => setIsAddMeetingOpen(true)} className="mt-4">
                <Plus className="h-4 w-4 mr-2" /> Add Meeting
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Meeting Dialog */}
      <Dialog open={isAddMeetingOpen} onOpenChange={setIsAddMeetingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Meeting</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Create a new meeting for {format(selectedDate, "MMMM d, yyyy")}
            </p>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Meeting Title</Label>
              <Input
                id="title"
                name="title"
                value={newMeeting.title}
                onChange={handleFormChange}
                placeholder="Enter meeting title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={newMeeting.startTime}
                  onChange={handleFormChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input id="endTime" name="endTime" type="time" value={newMeeting.endTime} onChange={handleFormChange} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client">Client</Label>
              <Input
                id="client"
                name="client"
                value={newMeeting.client}
                onChange={handleFormChange}
                placeholder="Enter client name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={newMeeting.location}
                onChange={handleFormChange}
                placeholder="Enter meeting location"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Meeting Type</Label>
              <Select value={newMeeting.type} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meeting type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newMeeting.description}
                onChange={handleFormChange}
                placeholder="Enter meeting details"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMeetingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMeeting} disabled={!newMeeting.title || !newMeeting.client}>
              Add Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Meeting Dialog */}
      <Dialog open={isViewMeetingOpen} onOpenChange={setIsViewMeetingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedMeeting && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>{selectedMeeting.title}</DialogTitle>
                  {getMeetingTypeBadge(selectedMeeting.type)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(selectedMeeting.date), "EEEE, MMMM d, yyyy")}
                </p>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedMeeting.startTime} - {selectedMeeting.endTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Client</p>
                    <p className="text-sm text-muted-foreground">{selectedMeeting.client}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{selectedMeeting.location}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Description</p>
                  <p className="text-sm text-muted-foreground mt-1">{selectedMeeting.description}</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewMeetingOpen(false)}>
                  Close
                </Button>
                <Button variant="destructive" onClick={handleDeleteMeeting}>
                  Delete Meeting
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
