"use client"

import type React from "react"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Clock, CalendarIcon, Users, MapPin } from "lucide-react"

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

export default function CalendarView() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
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

  // Get meetings for the selected date
  const getMeetingsForDate = (date: Date | undefined) => {
    if (!date) return []

    return meetings.filter(
      (meeting) =>
        meeting.date.getDate() === date.getDate() &&
        meeting.date.getMonth() === date.getMonth() &&
        meeting.date.getFullYear() === date.getFullYear(),
    )
  }

  // Handle date change
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
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
        date: date || new Date(),
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
    <div className="flex flex-col gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Select a date to view or add meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-md border"
              classNames={{
                month: "space-y-4",
                table: "w-full border-collapse",
                head_row: "flex w-full",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex-1 text-center",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative flex-1 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 mx-auto flex items-center justify-center rounded-md aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                nav_button: "border rounded-md p-1 hover:bg-accent",
                nav_button_previous: "absolute left-1 top-1",
                nav_button_next: "absolute right-1 top-1",
                caption: "relative flex justify-center py-2 mb-4",
              }}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={() => setIsAddMeetingOpen(true)}>Add Meeting</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {date
                ? date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No Date Selected"}
            </CardTitle>
            <CardDescription>{getMeetingsForDate(date).length} meetings scheduled</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {getMeetingsForDate(date).length > 0 ? (
            <div className="space-y-4">
              {getMeetingsForDate(date).map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleViewMeeting(meeting)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{meeting.title}</h3>
                    {getMeetingTypeBadge(meeting.type)}
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-gray-500">
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
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="mx-auto h-12 w-12 opacity-30" />
              <h3 className="mt-2 text-sm font-medium">No meetings scheduled</h3>
              <p className="mt-1 text-sm">Add a new meeting to get started.</p>
              <div className="mt-6">
                <Button onClick={() => setIsAddMeetingOpen(true)}>Add Meeting</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Meeting Dialog */}
      <Dialog open={isAddMeetingOpen} onOpenChange={setIsAddMeetingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Meeting</DialogTitle>
            <DialogDescription>Create a new meeting for {date?.toLocaleDateString()}</DialogDescription>
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
                <DialogDescription>{selectedMeeting.date.toLocaleDateString()}</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-sm text-gray-500">
                      {selectedMeeting.startTime} - {selectedMeeting.endTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Client</p>
                    <p className="text-sm text-gray-500">{selectedMeeting.client}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-500">{selectedMeeting.location}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Description</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedMeeting.description}</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewMeetingOpen(false)}>
                  Close
                </Button>
                <Button variant="destructive">Delete Meeting</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
