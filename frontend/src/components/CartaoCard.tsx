import React from 'react';

type CartaoProps = {
    nome: string;
    limite: number;
    fechamento: number;
    vencimento: number;
  };
  
  export default function CartaoCard({ nome, limite, fechamento, vencimento }: CartaoProps) {
    return (
      <div className="border rounded-2xl p-4 shadow bg-white">
        <h2 className="text-lg font-semibold">{nome}</h2>
        <p>Limite: R$ {limite.toFixed(2)}</p>
        <p>Fechamento: dia {fechamento}</p>
        <p>Vencimento: dia {vencimento}</p>
      </div>
    );
  }
  