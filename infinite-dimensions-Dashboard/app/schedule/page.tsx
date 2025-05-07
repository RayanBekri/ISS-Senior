// components/schedule-ui.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  format,
  addDays,
  subDays,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  parseISO,
  isSameDay,
  getDay,
} from "date-fns"

// Types for our events and requests
type Event = {
  id: string
  name: string
  startTime: string
  endTime: string
  date: string
  color: string
}

type ConsultationRequest = {
  id: string
  name: string
  date: string
  startTime: string
  endTime: string
  status: "pending" | "accepted" | "declined"
}

export default function ScheduleUI() {
  // State for the calendar
  const [currentDate, setCurrentDate] = useState(new Date(2023, 1, 16)) // Feb 16, 2023
  const [selectedDay, setSelectedDay] = useState(16)
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 1, 1)) // Feb 2023
  
  // Calculate the current week start (Sunday) and end (Saturday)
  const weekStart = startOfWeek(currentDate)
  const weekEnd = endOfWeek(currentDate)

  // Simplified events as requested
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      name: "Zaineb Abdelkefi",
      startTime: "09:00",
      endTime: "10:00",
      date: "2023-02-14", // Monday
      color: "purple",
    },
    {
      id: "2",
      name: "Youssef Ben Aifa",
      startTime: "14:00",
      endTime: "15:00",
      date: "2023-02-15", // Tuesday
      color: "purple",
    },
    {
      id: "3",
      name: "Yasmine Bejaoui",
      startTime: "15:00",
      endTime: "16:00",
      date: "2023-02-16", // Wednesday
      color: "green",
    },
    {
      id: "4",
      name: "Family Lunch",
      startTime: "12:00",
      endTime: "13:00",
      date: "2023-02-13", // Sunday
      color: "purple",
    },
    {
      id: "5",
      name: "Raja Saidi",
      startTime: "10:00",
      endTime: "11:00",
      date: "2023-02-18", // Friday
      color: "purple",
    },
  ])

  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>([
    {
      id: "req1",
      name: "Zeineb Bouhejba",
      date: "2023-02-16", // Tuesday
      startTime: "10:00",
      endTime: "11:00",
      status: "pending",
    },
  ])

  // State for the new event dialog
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    name: "",
    date: format(currentDate, "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "10:00",
    color: "purple",
  })

  // Generate days of the week (Sunday to Saturday)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i)
    return {
      date,
      day: date.getDate(),
      dayName: format(date, "EEE"),
    }
  })

  // Handle accepting a consultation request
  const handleAcceptRequest = (requestId: string) => {
    setConsultationRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "accepted" } : req)))

    // Find the request
    const request = consultationRequests.find((req) => req.id === requestId)

    if (request) {
      // Add it to the events
      const newEvent: Event = {
        id: `event-${requestId}`,
        name: request.name,
        date: request.date,
        startTime: request.startTime,
        endTime: request.endTime,
        color: "purple",
      }

      setEvents((prev) => [...prev, newEvent])
    }
  }

  // Handle declining a consultation request
  const handleDeclineRequest = (requestId: string) => {
    setConsultationRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "declined" } : req)))
  }

  // Handle adding a new event
  const handleAddNewEvent = () => {
    if (newEvent.name && newEvent.date && newEvent.startTime && newEvent.endTime) {
      const eventToAdd: Event = {
        id: `event-${Date.now()}`,
        name: newEvent.name as string,
        date: newEvent.date as string,
        startTime: newEvent.startTime as string,
        endTime: newEvent.endTime as string,
        color: newEvent.color || "purple",
      }

      setEvents((prev) => [...prev, eventToAdd])
      setIsNewEventDialogOpen(false)
      setNewEvent({
        name: "",
        date: format(currentDate, "yyyy-MM-dd"),
        startTime: "09:00",
        endTime: "10:00",
        color: "purple",
      })
    }
  }

  // Time slots for the schedule
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
  ]

  // Navigation functions
  const goToPreviousWeek = () => {
    setCurrentDate(prevDate => subDays(prevDate, 7))
  }

  const goToNextWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, 7))
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(prevDate => subMonths(prevDate, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(prevDate => addMonths(prevDate, 1))
  }

  // Generate days for the month view
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = getDay(firstDayOfMonth)
    const daysInMonth = lastDayOfMonth.getDate()

    // Create array for all days in the month view
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  // Check if a day is in the current week
  const isDayInCurrentWeek = (date: Date) => {
    return isSameDay(date, currentDate) || 
           (date >= weekStart && date <= weekEnd)
  }

  // Generate months for selection
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">
                February, 14-20
              </h2>
              <div className="flex items-center gap-2">
                <Select defaultValue="february">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="February" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month.toLowerCase()} value={month.toLowerCase()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  size="sm" 
                  className="bg-purple-500 hover:bg-purple-600"
                  onClick={() => setIsNewEventDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add new
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              {/* Header row with days */}
              <div className="grid grid-cols-8 border-b">
                <div className="p-4 text-center font-medium text-gray-500 border-r">Week</div>
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className={`p-4 text-center font-medium border-r ${
                      day.day === selectedDay ? "bg-purple-100" : ""
                    } ${index === 6 ? "border-r-0" : ""}`}
                  >
                    <div className="text-gray-700">{day.day}</div>
                    <div className="text-gray-500">{day.dayName}</div>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-8 border-b last:border-b-0">
                  <div className="p-4 border-r text-center text-gray-500">
                    {time}
                  </div>
                  
                  {weekDays.map((day, dayIndex) => {
                    // Find event for this time slot and day
                    const event = events.find(e => {
                      const eventDate = format(day.date, "yyyy-MM-dd")
                      return e.date === eventDate && e.startTime === time
                    })
                    
                    return (
                      <div 
                        key={dayIndex} 
                        className={`p-2 border-r ${
                          day.day === selectedDay ? "bg-purple-100" : ""
                        } ${dayIndex === 6 ? "border-r-0" : ""}`}
                      >
                        {event && (
                          <div 
                            className={`rounded-md p-2 ${
                              event.color === "purple" 
                                ? "bg-purple-100" 
                                : "bg-green-100"
                            }`}
                          >
                            <div className="font-medium text-sm">{event.name}</div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <span className={`inline-block w-2 h-2 rounded-full ${
                                event.color === "purple" ? "bg-purple-500" : "bg-green-500"
                              } mr-1`}></span>
                              {event.startTime} - {event.endTime}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right sidebar */}
        <div className="w-full lg:w-64">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">February</span>
              <Button variant="ghost" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              <div className="text-xs font-medium text-gray-500">S</div>
              <div className="text-xs font-medium text-gray-500">M</div>
              <div className="text-xs font-medium text-gray-500">T</div>
              <div className="text-xs font-medium text-gray-500">W</div>
              <div className="text-xs font-medium text-gray-500">T</div>
              <div className="text-xs font-medium text-gray-500">F</div>
              <div className="text-xs font-medium text-gray-500">S</div>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth().map((day, i) => {
                if (!day) return <div key={`empty-${i}`} className="h-8 w-8"></div>
                
                const isSelected = day.getDate() === selectedDay;
                const isInCurrentWeek = isDayInCurrentWeek(day);
                
                return (
                  <button
                    key={i}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                      isSelected 
                        ? "bg-purple-500 text-white" 
                        : isInCurrentWeek
                          ? "bg-purple-100"
                          : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setSelectedDay(day.getDate())
                      setCurrentDate(day)
                    }}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </Card>
          
          {consultationRequests.some(req => req.status === "pending") && (
            <Card className="p-4 mt-4">
              <div className="text-center mb-4">
                <h3 className="text-purple-500 font-medium">Consultation Request</h3>
              </div>
              
              {consultationRequests
                .filter(req => req.status === "pending")
                .map(request => (
                  <div key={request.id} className="text-center mb-4">
                    <div className="font-medium text-lg">{request.name}</div>
                    <div className="text-gray-500 text-sm">
                      Tuesday, 10AM-11 AM
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        Decline
                      </Button>
                      <Button 
                        className="flex-1 bg-purple-500 hover:bg-purple-600"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                ))}
            </Card>
          )}
        </div>
      </div>

      {/* Dialog for adding new events */}
      <Dialog open={isNewEventDialogOpen} onOpenChange={setIsNewEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Event Name</Label>
              <Input 
                id="name" 
                value={newEvent.name || ""} 
                onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={newEvent.date || ""} 
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input 
                  id="startTime" 
                  type="time" 
                  value={newEvent.startTime || ""} 
                  onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input 
                  id="endTime" 
                  type="time" 
                  value={newEvent.endTime || ""} 
                  onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <Select 
                value={newEvent.color || "purple"} 
                onValueChange={(value) => setNewEvent({...newEvent, color: value})}
              >
                <SelectTrigger id="color">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-600" onClick={handleAddNewEvent}>
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}