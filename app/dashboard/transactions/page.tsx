import { AddTransactionDialog } from '@/components/AddTransactionDialog'
import { TransactionsTable } from '@/components/TransactionTable'
import React from 'react'

export default function page() {
  return (
    <div>
      <div className="space-y-4">
        <div className='flex items-center justify-between'>
  <h2 className="text-xl font-semibold">Recent Transactions</h2>  
    <AddTransactionDialog/>
        </div>
  <TransactionsTable />

</div>
    </div>
  )
}
