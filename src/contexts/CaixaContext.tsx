// src/contexts/CaixaContext.tsx
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { caixaMock } from '../mocks/caixa';

export type Transacao = {
  id: string;
  tipo: 'entrada' | 'saida';
  descricao: string;
  valor: number;
  data: string;
};

type CaixaContextType = {
  transacoes: Transacao[];
  saldo: number;
  adicionarTransacao: (t: Transacao) => void;
};

const CaixaContext = createContext<CaixaContextType | null>(null);

export function CaixaProvider({ children }: { children: ReactNode }) {
  const [transacoes, setTransacoes] = useState<Transacao[]>(caixaMock);

  function adicionarTransacao(t: Transacao) {
    setTransacoes(prev => [...prev, t]);
  }

  const saldo = useMemo(() => {
    return transacoes.reduce((acc, t) => {
      return t.tipo === 'entrada' ? acc + t.valor : acc - t.valor;
    }, 0);
  }, [transacoes]);

  return (
    <CaixaContext.Provider value={{ transacoes, saldo, adicionarTransacao }}>
      {children}
    </CaixaContext.Provider>
  );
}

export function useCaixa() {
  const context = useContext(CaixaContext);
  if (!context) {
    throw new Error('useCaixa deve ser usado dentro de CaixaProvider');
  }
  return context;
}
