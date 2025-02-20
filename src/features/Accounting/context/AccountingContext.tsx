import { createContext, useContext } from "react";

export type AccountingContextValue = {
  tours: string[];
  isSelectionEnabeld: boolean;
  setIsSelectionEnabeld: React.Dispatch<React.SetStateAction<boolean>>;
  clearTours: () => void;
  toggleTour: (id: string) => void;
  modalOpened: boolean;
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setTours: React.Dispatch<React.SetStateAction<string[]>>;
};

const AccountingContext = createContext<AccountingContextValue>({
  isSelectionEnabeld: false,
  setIsSelectionEnabeld: () => {},
  tours: [],
  clearTours: () => {},
  toggleTour: () => {},
  modalOpened: false,
  setModalOpened: () => {},
  setTours: () => {},
});

export const useAccountingContext = () => useContext(AccountingContext);

export const AccountingProvider = AccountingContext.Provider;
