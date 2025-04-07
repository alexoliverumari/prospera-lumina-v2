import { createContext, useContext, useState, ReactNode } from "react";

interface Card {
  id: number;
  nome: string;
  limite: number;
  fechamento: number;
  vencimento: number;
}

interface CardContextType {
  editingCard: Card | null;
  setEditingCard: (card: Card | null) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  return (
    <CardContext.Provider value={{ editingCard, setEditingCard }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCardContext must be used within CardProvider");
  return context;
};
