import React from 'react'

const TransactionContext = React.createContext({
    total: 0, 
    setTotal: (count: number) => {}
})

export default TransactionContext