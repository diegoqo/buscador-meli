import React from 'react';

export const FormatearPrecio = (currency: string, amount: number) => {
    return Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}
