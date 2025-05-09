"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Eye, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Sample data for company verification
const companyVerificationData = [
  {
    id: "VER-001",
    companyName: "TechPrint Solutions",
    registrationNumber: "TP-78945612",
    submissionDate: "2023-04-15",
    status: "pending",
    documents: ["Business Registration", "Tax Certificate", "ID Proof"],
  },
  {
    id: "VER-002",
    companyName: "Creative Models Inc.",
    registrationNumber: "CM-45678923",
    submissionDate: "2023-04-12",
    status: "verified",
    documents: ["Business Registration", "Tax Certificate", "ID Proof", "Business Plan"],
  },
  {
    id: "VER-003",
    companyName: "3D Innovations Ltd",
    registrationNumber: "3D-12345678",
    submissionDate: "2023-04-10",
    status: "rejected",
    documents: ["Business Registration", "ID Proof"],
    rejectionReason: "Incomplete documentation. Missing tax certificate.",
  },
  {
    id: "VER-004",
    companyName: "PrintMaster Pro",
    registrationNumber: "PM-98765432",
    submissionDate: "2023-04-08",
    status: "pending",
    documents: ["Business Registration", "Tax Certificate", "ID Proof", "Business License"],
  },
  {
    id: "VER-005",
    companyName: "Dimension Crafters",
    registrationNumber: "DC-56781234",
    submissionDate: "2023-04-05",
    status: "verified",
    documents: ["Business Registration", "Tax Certificate", "ID Proof"],
  },
]

export default function CompanyVerificationTable() {
  const { toast } = useToast()
  const [verificationData, setVerificationData] = useState(companyVerificationData)
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [approvalNotes, setApprovalNotes] = useState("")

  const handleViewDetails = (company: any) => {
    setSelectedCompany(company)
    setIsViewDialogOpen(true)
  }

  const handleRejectInitiate = (company: any) => {
    setSelectedCompany(company)
    setRejectionReason("")
    setIsRejectDialogOpen(true)
  }

  const handleApproveInitiate = (company: any) => {
    setSelectedCompany(company)
    setApprovalNotes("")
    setIsApproveDialogOpen(true)
  }

  const handleReject = () => {
    setVerificationData((prevData) =>
      prevData.map((company) =>
        company.id === selectedCompany.id ? { ...company, status: "rejected", rejectionReason } : company,
      ),
    )

    toast({
      title: "Company Rejected",
      description: `${selectedCompany.companyName} has been rejected.`,
    })

    setIsRejectDialogOpen(false)
  }

  const handleApprove = () => {
    setVerificationData((prevData) =>
      prevData.map((company) =>
        company.id === selectedCompany.id ? { ...company, status: "verified", approvalNotes } : company,
      ),
    )

    toast({
      title: "Company Verified",
      description: `${selectedCompany.companyName} has been verified successfully.`,
    })

    setIsApproveDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pending
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Company Verification Requests</h2>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Registration Number</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verificationData
              .filter((company) => company.status !== "rejected")
              .map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.id}</TableCell>
                  <TableCell>{company.companyName}</TableCell>
                  <TableCell>{company.registrationNumber}</TableCell>
                  <TableCell>{company.submissionDate}</TableCell>
                  <TableCell>{getStatusBadge(company.status)}</TableCell>
                  <TableCell>{company.documents.length} files</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {company.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => handleApproveInitiate(company)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleRejectInitiate(company)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Company Details</DialogTitle>
            <DialogDescription>Verification request details for {selectedCompany?.companyName}</DialogDescription>
          </DialogHeader>

          {selectedCompany && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Company ID</h4>
                  <p>{selectedCompany.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <p>{getStatusBadge(selectedCompany.status)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Company Name</h4>
                  <p>{selectedCompany.companyName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Registration Number</h4>
                  <p>{selectedCompany.registrationNumber}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Submission Date</h4>
                  <p>{selectedCompany.submissionDate}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Documents</h4>
                <div className="space-y-2">
                  {selectedCompany.documents.map((doc: string, index: number) => (
                    <div key={index} className="flex items-center p-2 border rounded-md">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" />
                      <span>{doc}</span>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {selectedCompany.status === "rejected" && selectedCompany.rejectionReason && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Rejection Reason</h4>
                  <p className="text-red-600">{selectedCompany.rejectionReason}</p>
                </div>
              )}

              {selectedCompany.status === "verified" && selectedCompany.approvalNotes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Approval Notes</h4>
                  <p className="text-green-600">{selectedCompany.approvalNotes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <AlertDialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Company Verification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject the verification request for {selectedCompany?.companyName}? Please
              provide a reason for rejection.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <Label htmlFor="rejectionReason">Rejection Reason</Label>
            <Textarea
              id="rejectionReason"
              placeholder="Enter the reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-2"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700"
              disabled={!rejectionReason.trim()}
            >
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Approve Dialog */}
      <AlertDialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Company Verification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve the verification request for {selectedCompany?.companyName}? You can add
              optional notes.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <Label htmlFor="approvalNotes">Approval Notes (Optional)</Label>
            <Textarea
              id="approvalNotes"
              placeholder="Enter any notes for approval"
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
              className="mt-2"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
