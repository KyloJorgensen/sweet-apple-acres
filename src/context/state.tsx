import { createContext, useContext, useState } from "react";

export interface AppContextValue {
  cartProducts: Record<string, { id: string; quantity: number }>;
}

const defaultState = { cartProducts: {} };

const AppContext = createContext<{
  sharedState: AppContextValue;
  setSharedState?: React.Dispatch<React.SetStateAction<AppContextValue>>;
}>({ sharedState: defaultState });

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [sharedState, setSharedState] = useState<AppContextValue>({
    ...defaultState,
  });
  return (
    <AppContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const appContext = useContext(AppContext);
  if (appContext === undefined) {
    throw new Error("useAppContext must be inside a AppProvider");
  }
  return appContext;
}
