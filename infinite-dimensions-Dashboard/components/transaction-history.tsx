"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TransactionHistory() {
  const transactions = [
    {
      receiver: "Michael Knight",
      type: "Custom Order",
      date: "13 Dec 2020",
      amount: "$80.67",
    },
    {
      receiver: "Jonathan Higgins",
      type: "Shopping",
      date: "14 Dec 2020",
      amount: "$1250.00",
    },
    {
      receiver: "Willie Tanner",
      type: "Bulk Order",
      date: "07 Dec 2020",
      amount: "$99.50",
    },
    {
      receiver: "Murdock",
      type: "Custom Order",
      date: "08 Dec 2020",
      amount: "$55.50",
    },
    {
      receiver: "Theodore T.C. Calvin",
      type: "Shopping",
      date: "31 Nov 2020",
      amount: "$230",
    },
  ]

  return (
    <Card className="transition-all hover:shadow-md h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Transaction history</CardTitle>
        <Button variant="link" size="sm" asChild>
          <Link href="/finance">See All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3 font-normal">Receiver</th>
                <th className="pb-3 font-normal">Type</th>
                <th className="pb-3 font-normal">Date</th>
                <th className="pb-3 font-normal text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => console.log(`View transaction details for ${transaction.receiver}`)}
                >
                  <td className="py-3">{transaction.receiver}</td>
                  <td className="py-3">
                    <Badge variant={transaction.type === "Shopping" ? "default" : "secondary"}>
                      {transaction.type}
                    </Badge>
                  </td>
                  <td className="py-3 text-gray-500">{transaction.date}</td>
                  <td className="py-3 text-right">{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link href="/finance" className="flex items-center gap-1">
              View all transactions <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
