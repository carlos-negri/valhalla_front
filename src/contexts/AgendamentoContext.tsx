// src/contexts/AgendamentoContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';
import { agendamentosMock } from '../mocks/agendamentos';

type Agendamento = {
  id: string;
  cliente: string;
  servico: string;
  data: string; // ISO
  hora: string; // HH:mm (legacy name 'hora' used across app)
};

type AgendamentoContextType = {
  agendamentos: Agendamento[];
  adicionarAgendamento: (a: Agendamento) => void;
};

const AgendamentoContext = createContext<AgendamentoContextType | null>(null);

export function AgendamentoProvider({ children }: { children: ReactNode }) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(agendamentosMock);

  function adicionarAgendamento(a: Agendamento) {
    setAgendamentos(prev => [...prev, a]);
  }

  return (
    <AgendamentoContext.Provider value={{ agendamentos, adicionarAgendamento }}>
      {children}
    </AgendamentoContext.Provider>
  );
}

export function useAgendamentos() {
  const ctx = useContext(AgendamentoContext);
  if (!ctx) throw new Error('useAgendamentos deve ser usado dentro de AgendamentoProvider');
  return ctx;
}
