import React, { createContext, useState, useMemo } from "react";

interface AreaContextType {
  isDialogVisible: boolean;
  setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AreaContext = createContext<AreaContextType>({
  isDialogVisible: false,
  setIsDialogVisible: () => undefined,
});

export const AreaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const initialContext = useMemo(() => {
    return {
      isDialogVisible,
      setIsDialogVisible
    };
  }, [isDialogVisible]);

  return (
    <AreaContext.Provider value={initialContext}>
      {children}
    </AreaContext.Provider>
  );
};