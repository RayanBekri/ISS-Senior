"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

// Types for our verification system
type VerificationStatus = "accepted" | "denied" | "pending"

type CompanyVerification = {
  id: string
  companyName: string
  taxNumber: string
  status: VerificationStatus
  dateSubmitted: string
}

type CompanyApiResponse = {
  user_id: number
  company_name: string
  company_tax_number: string
  approval_status: VerificationStatus
  created_at: string
}

export default function AccountVerification() {
  const router = useRouter()

  // State for the verification table - including both verified companies and requests
  const [verifications, setVerifications] = useState<CompanyVerification[]>([
  ])

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/companies")
      if (!response.ok) throw new Error("Failed to fetch companies")

      const data: CompanyApiResponse[] = await response.json()
      const formatted: CompanyVerification[] = data.map((company) => ({
        id: String(company.user_id),
        companyName: company.company_name,
        taxNumber: company.company_tax_number,
        status: company.approval_status,
        dateSubmitted: new Date(company.created_at).toISOString().split("T")[0],
      }))

      setVerifications(formatted)
    } catch (err) {
      console.error("Error loading companies:", err)
    }
  }

  // Update approval status in the backend
  const updateApprovalStatus = async (userId: string, status: VerificationStatus) => {
    try {
      const response = await fetch("http://localhost:3001/api/user/companies/approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          approval_status: status,
        }),
      })

      if (!response.ok) throw new Error("Failed to update approval status")

      // Refresh the list after successful update
      await fetchCompanies()
    } catch (err) {
      console.error("Error updating approval status:", err)
      alert("Failed to update approval status. Please try again.")
    }
  }

  // Handle accepting a verification
  const handleAccept = async (id: string) => {
    await updateApprovalStatus(id, "accepted")
    const company = verifications.find((v) => v.id === id)
    if (company) {
      alert(`Company ${company.companyName} has been accepted!`)
    }
  }

  // Handle denying a verification
  const handleDeny = async (id: string) => {
    await updateApprovalStatus(id, "denied")
    const company = verifications.find((v) => v.id === id)
    if (company) {
      alert(`Company ${company.companyName} has been denied.`)
    }
  }

  // Get status badge
  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case "accepted":
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Accepted</span>
          </div>
        )
      case "denied":
        return (
          <div className="flex items-center text-red-600">
            <XCircle className="h-4 w-4 mr-1" />
            <span>Denied</span>
          </div>
        )
      case "pending":
        return (
          <div className="flex items-center text-amber-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>Pending</span>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Account Verification</h1>
      </div>

      {/* Full-width Verification Table */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Company Verification Status</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Tax Identification Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verifications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No verification records found
                  </TableCell>
                </TableRow>
              ) : (
                verifications.map((verification) => (
                  <TableRow key={verification.id}>
                    <TableCell className="font-medium">{verification.companyName}</TableCell>
                    <TableCell>{verification.taxNumber}</TableCell>
                    <TableCell>{getStatusBadge(verification.status)}</TableCell>
                    <TableCell>{verification.dateSubmitted}</TableCell>
                    <TableCell className="text-right">
                      {verification.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => handleDeny(verification.id)}
                          >
                            Deny
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleAccept(verification.id)}
                          >
                            Accept
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Statistics Card */}
      <Card className="mt-6">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Verification Statistics</h2>

          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 bg-green-50">
              <div className="text-green-600 font-medium mb-1">Accepted</div>
              <div className="text-2xl font-bold">{verifications.filter((v) => v.status === "accepted").length}</div>
            </div>

            <div className="border rounded-lg p-4 bg-red-50">
              <div className="text-red-600 font-medium mb-1">Denied</div>
              <div className="text-2xl font-bold">{verifications.filter((v) => v.status === "denied").length}</div>
            </div>

            <div className="border rounded-lg p-4 bg-amber-50">
              <div className="text-amber-600 font-medium mb-1">Pending</div>
              <div className="text-2xl font-bold">{verifications.filter((v) => v.status === "pending").length}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
