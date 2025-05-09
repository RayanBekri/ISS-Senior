import ScheduleCalendar from "@/components/schedule/schedule-calendar"

export default function Schedule() {
  return (
    <div className="p-6">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">Manage your meetings and appointments with clients.</p>
      </div>

      <ScheduleCalendar />
    </div>
  )
}
