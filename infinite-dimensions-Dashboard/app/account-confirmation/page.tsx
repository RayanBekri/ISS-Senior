import CompanyVerificationTable from "@/components/account-confirmation/company-verification-table"

export default function AccountConfirmation() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Account Confirmation</h1>
        <p className="text-muted-foreground">Verify company tax numbers and approve account registrations.</p>
      </div>

      <CompanyVerificationTable />
    </div>
  )
}
