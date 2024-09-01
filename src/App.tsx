import { DialogProvider } from "./context/DialogContext";
import { ProductionItemProvider } from "./context/ProductionItemContext";
import { ProductionListProvider } from "./context/ProductionListContext";
import { MainApp } from "./mainApp"; // Neue Komponente, die den Rest des Codes enthält

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
