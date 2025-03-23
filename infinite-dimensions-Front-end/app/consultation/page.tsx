"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DayPicker } from "react-day-picker"
import { format, setHours, setMinutes, isSameDay, addMonths } from "date-fns"
import { Calendar, Clock, Users, Video, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/app/contexts/AuthContext"
import { consultationsApi } from "@/app/api/apiService"

// Update the time slots display and enhance the UX

// First, ensure the AVAILABLE_HOURS array is correctly defined (9 AM to 4 PM)
const AVAILABLE_HOURS = [9, 10, 11, 12, 13, 14, 15, 16]

export default function ConsultationPage() {
  const { user, token } = useAuth()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [consultationTopic, setConsultationTopic] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAuthMessage, setShowAuthMessage] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Define calendar month range (current month only)
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const fromMonth = new Date(currentYear, currentMonth)
  const toMonth = addMonths(fromMonth, 1)

  // Handler for date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime(null) // Reset time when date changes
  }

  // Handler for time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  // Replace the handleSubmit function with this updated version
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !token) {
      setShowAuthMessage(true)
      return
    }

    if (!selectedDate || !selectedTime) {
      setError("Please select both a date and time for your consultation")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Parse the selected time
      const [hours, minutes] = selectedTime.split(":").map(Number)
      const consultationDateTime = new Date(selectedDate)
      consultationDateTime.setHours(hours, minutes, 0, 0)

      // Prepare consultation request data
      const consultationData = {
        client_id: user.user_id,
        employee_id: 1, // Assuming a default employee ID for now
        requested_time: consultationDateTime.toISOString(),
        notes: `Topic: ${consultationTopic}\n${additionalNotes}`,
      }

      // Submit consultation request
      await consultationsApi.requestConsultation(token, consultationData)
      setSubmitSuccess(true)

      // Reset form
      setSelectedDate(undefined)
      setSelectedTime(null)
      setConsultationTopic("")
      setAdditionalNotes("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to schedule consultation")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update the auth message dialog to be more user-friendly

  if (showAuthMessage) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#a408c3] p-6 text-white text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Account Required</h1>
          </div>

          <div className="p-8">
            <p className="text-gray-600 mb-6 text-center">
              You need to have an account to schedule a consultation. This helps us track your appointments and provide
              better service.
            </p>

            <div className="space-y-4">
              <Link
                href="/register"
                className="block w-full bg-[#a408c3] text-white py-3 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors text-center"
              >
                Create an Account
              </Link>

              <Link
                href="/login"
                className="block w-full border border-[#a408c3] text-[#a408c3] py-3 px-6 rounded-lg hover:bg-[#a408c3] hover:text-white transition-colors text-center"
              >
                Login to Existing Account
              </Link>

              <button
                onClick={() => setShowAuthMessage(false)}
                className="block w-full text-gray-500 hover:text-gray-700 py-2 text-center"
              >
                Back to Calendar
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
              <p>
                <strong>Why do I need an account?</strong> Creating an account allows us to:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Send you confirmation and reminder emails</li>
                <li>Keep track of your consultation history</li>
                <li>Provide personalized recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Update the success message to be more visually appealing

  if (submitSuccess) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-500 p-6 text-white text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Consultation Scheduled!</h1>
          </div>

          <div className="p-8">
            <p className="text-gray-600 mb-6 text-center">
              Your consultation has been scheduled successfully. You will receive a confirmation email with the meeting
              details.
            </p>

            {selectedDate && selectedTime && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Appointment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <span>{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-2" />
                    <span>
                      {format(setHours(new Date(), Number.parseInt(selectedTime.split(":")[0])), "h:mm a")} -{" "}
                      {format(setHours(new Date(), Number.parseInt(selectedTime.split(":")[0]) + 1), "h:mm a")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-500 mr-2" />
                    <span>Topic: {consultationTopic}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Link
                href="/"
                className="block w-full bg-[#a408c3] text-white py-3 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors text-center"
              >
                Return to Home
              </Link>

              <button
                onClick={() => setSubmitSuccess(false)}
                className="block w-full border border-[#a408c3] text-[#a408c3] py-3 px-6 rounded-lg hover:bg-[#a408c3] hover:text-white transition-colors"
              >
                Schedule Another Consultation
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
              <p>
                <strong>What's next?</strong> Our team will:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Send you a confirmation email with meeting details</li>
                <li>Prepare for your consultation based on your notes</li>
                <li>Send a reminder 24 hours before your appointment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Update the getAvailableTimeSlots function to improve formatting and clarity
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return []

    // Only show future time slots for today
    const now = new Date()
    const isToday = isSameDay(selectedDate, now)
    const currentHour = now.getHours()

    return AVAILABLE_HOURS.map((hour) => {
      const slotTime = setMinutes(setHours(new Date(), hour), 0)
      const formattedTime = format(slotTime, "HH:mm")
      // For today, disable past hours
      const isPast = isToday && hour <= currentHour

      return {
        time: formattedTime,
        hour: hour,
        disabled: isPast,
        label: format(slotTime, "h:mm a"), // Format as "9:00 am"
      }
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#a408c3] text-white p-6">
            <h1 className="text-3xl font-bold mb-2">Schedule a Consultation</h1>
            <p className="opacity-90">
              Book a one-hour online consultation with one of our 3D printing experts to discuss your project.
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-red-700 text-sm">{error}</div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar Section */}
              <div>
                <div className="mb-4 flex items-center">
                  <Calendar className="w-5 h-5 text-[#a408c3] mr-2" />
                  <h2 className="text-xl font-semibold">Select a Date</h2>
                </div>

                <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                  <DayPicker
                    mode="single"
                    selected={selectedDate || undefined}
                    onSelect={handleDateSelect}
                    fromMonth={fromMonth}
                    toMonth={toMonth}
                    disabled={[
                      { before: today },
                      { dayOfWeek: [0, 6] }, // Disable weekends (Sunday: 0, Saturday: 6)
                    ]}
                    modifiers={{
                      today: today,
                      ...(selectedDate ? { selected: selectedDate } : {}),
                    }}
                    modifiersStyles={{
                      today: { fontWeight: "bold", color: "#a408c3" },
                      selected: { backgroundColor: "#a408c3", color: "white" },
                    }}
                    styles={{
                      caption: { color: "#a408c3" },
                      day: { margin: "0.2em", borderRadius: "8px" },
                    }}
                    footer={
                      <p className="text-sm text-gray-500 mt-4 text-center">
                        Consultations are available Monday-Friday, 9:00 AM - 4:00 PM
                      </p>
                    }
                  />
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="mt-6">
                    <div className="mb-4 flex items-center">
                      <Clock className="w-5 h-5 text-[#a408c3] mr-2" />
                      <h2 className="text-xl font-semibold">Select a Time</h2>
                    </div>

                    <div className="mb-2 text-sm text-gray-600">Available consultation hours: 9:00 AM - 4:00 PM</div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {getAvailableTimeSlots().map(({ time, hour, disabled, label }) => (
                        <button
                          key={time}
                          onClick={() => !disabled && handleTimeSelect(time)}
                          className={`
                            py-3 px-4 rounded-md text-center transition-all duration-200
                            ${
                              disabled
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : selectedTime === time
                                  ? "bg-[#a408c3] text-white shadow-md transform scale-105"
                                  : "bg-white border border-gray-300 hover:border-[#a408c3] hover:shadow-sm"
                            }
                          `}
                          disabled={disabled}
                        >
                          <span className="block font-medium">{label}</span>
                          <span className="text-xs mt-1 block">{disabled ? "Unavailable" : "Available"}</span>
                        </button>
                      ))}
                    </div>

                    {isSameDay(selectedDate, new Date()) && (
                      <p className="text-xs text-gray-500 mt-2">
                        * Times earlier than current time are unavailable for today
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Form Section */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="consultationTopic" className="block text-sm font-medium text-gray-700 mb-1">
                      Consultation Topic <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="consultationTopic"
                      value={consultationTopic}
                      onChange={(e) => setConsultationTopic(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none transition-colors"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="Project Planning">Project Planning</option>
                      <option value="Material Selection">Material Selection</option>
                      <option value="Design Review">Design Review</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Cost Estimation">Cost Estimation</option>
                      <option value="Other">Other</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Choose the main topic you'd like to discuss</p>
                  </div>

                  <div>
                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      id="additionalNotes"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Please provide any details about your project or specific questions you'd like to discuss"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none transition-colors"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      The more details you provide, the better we can prepare for your consultation
                    </p>
                  </div>

                  {selectedDate && selectedTime && (
                    <div className="p-5 bg-purple-50 rounded-lg border border-purple-100">
                      <h3 className="font-medium text-[#a408c3] mb-3">Your Selected Appointment</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-[#a408c3] mr-2" />
                          <span className="font-medium">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-[#a408c3] mr-2" />
                          <span className="font-medium">
                            {format(setHours(new Date(), Number.parseInt(selectedTime.split(":")[0])), "h:mm a")} -{" "}
                            {format(setHours(new Date(), Number.parseInt(selectedTime.split(":")[0]) + 1), "h:mm a")}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Video className="w-4 h-4 text-[#a408c3] mr-2" />
                          <span>Online Video Consultation (1 hour)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {!user ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setShowAuthMessage(true)}
                        className="w-full bg-[#a408c3] text-white py-3 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors flex items-center justify-center"
                      >
                        <span className="mr-2">Login to Schedule</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>You need to be logged in to book a consultation</span>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-[#a408c3] text-white py-3 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors disabled:opacity-70 flex items-center justify-center"
                      disabled={isSubmitting || !selectedDate || !selectedTime || !consultationTopic}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                          Scheduling...
                        </div>
                      ) : (
                        <>
                          <span>Schedule Consultation</span>
                          <Calendar className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  )}
                </form>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-start">
                  <Users className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-700 mb-1">Meet Our Experts</h3>
                    <p className="text-sm text-blue-600">
                      Our team includes specialists in various 3D printing technologies, materials, and applications.
                      We'll match you with the expert best suited to your project needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

