import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { ProductionListProvider } from "./context/ProductionListContext";
import { DialogProvider } from "./context/DialogContext";
import { ProductionItemProvider } from "./context/ProductionItemContext";
import { AreaProvider } from "./context/AreaContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AreaProvider>
      <ProductionListProvider>
        <DialogProvider>
          <ProductionItemProvider>
            <App />
          </ProductionItemProvider>
        </DialogProvider>
      </ProductionListProvider>
    </AreaProvider>
  </StrictMode>
);
