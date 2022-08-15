import React from 'react';
declare const TransactionContext: React.Context<{
    total: number;
    setTotal: (count: number) => void;
}>;
export default TransactionContext;
