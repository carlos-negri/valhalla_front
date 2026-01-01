import { createContext, ReactNode, useContext, useState } from 'react';

type ClienteContextType = {
  nome: string;
  setNome: (nome: string) => void;
  logout: () => void;
};

const ClienteContext = createContext<ClienteContextType | null>(null);

export function ClienteProvider({ children }: { children: ReactNode }) {
  const [nome, setNome] = useState('');

  function logout() {
    setNome('');
  }

  return (
    <ClienteContext.Provider value={{ nome, setNome, logout }}>
      {children}
    </ClienteContext.Provider>
  );
}

export function useCliente() {
  const ctx = useContext(ClienteContext);
  if (!ctx) throw new Error('useCliente deve ser usado dentro de ClienteProvider');
  return ctx;
}
