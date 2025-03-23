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
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Transaction history</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3 font-normal">Reciever</th>
              <th className="pb-3 font-normal">Type</th>
              <th className="pb-3 font-normal">Date</th>
              <th className="pb-3 font-normal text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-t">
                <td className="py-3">{transaction.receiver}</td>
                <td className="py-3">
                  <span className={`text-${transaction.type === "Shopping" ? "brand" : "blue"}-400`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="py-3 text-gray-500">{transaction.date}</td>
                <td className="py-3 text-right">{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

