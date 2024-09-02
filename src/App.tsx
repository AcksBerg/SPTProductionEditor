import { DialogProvider } from "./context/DialogContext";
import { ProductionItemProvider } from "./context/ProductionItemContext";
import { ProductionListProvider } from "./context/ProductionListContext";
import { MainApp } from "./mainApp"; 

export const App = () => {
  return (
    <ProductionListProvider>
      <DialogProvider>
        <ProductionItemProvider>
          <MainApp />
        </ProductionItemProvider>
      </DialogProvider>
    </ProductionListProvider>
  );
};
