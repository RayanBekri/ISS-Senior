"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Mail, Bell } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function NotificationSettings() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Notification Settings Updated",
        description: "Your notification preferences have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage how and when you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Notifications
          </h3>
          <div className="space-y-2">
            {[
              "New orders",
              "Order status changes",
              "Low inventory alerts",
              "New account registrations",
              "System updates",
            ].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <Label className="flex-1">{item}</Label>
                <Switch defaultChecked={item !== "System updates"} />
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Bell className="h-4 w-4" />
            In-App Notifications
          </h3>
          <div className="space-y-2">
            {["New orders", "Order status changes", "Low inventory alerts", "Chat messages", "Meeting reminders"].map(
              (item) => (
                <div key={item} className="flex items-center justify-between">
                  <Label className="flex-1">{item}</Label>
                  <Switch defaultChecked />
                </div>
              ),
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Turn Off All</Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  )
}
