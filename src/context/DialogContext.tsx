import React, { createContext, useState, useMemo } from "react";

interface DialogContextType {
  isDialogVisible: boolean;
  setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogContext = createContext<DialogContextType>({
  isDialogVisible: false,
  setIsDialogVisible: () => undefined,
});

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
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
    <DialogContext.Provider value={initialContext}>
      {children}
    </DialogContext.Provider>
  );
};