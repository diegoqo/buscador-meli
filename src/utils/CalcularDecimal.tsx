import React from 'react';

export const calcularDecimal = (amount: number) => {
    const amountSplit: string[] = amount.toString().split('.');
    return amountSplit.length > 1
        ? validarDecimal(amountSplit[1])
        : '00'
}

const validarDecimal = (decimal: string) => {
    return (decimal.length == 1 ? decimal.concat('0') : decimal).substring(0, 1);
}
