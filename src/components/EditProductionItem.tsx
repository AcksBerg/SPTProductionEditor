import { Dialog } from "primereact/dialog";
import { DialogContext } from "../context/DialogContext";
import { useContext } from "react";
import { ProductionItemContext } from "../context/ProductionItemContext";

export const EditProductionItem = () => {
  const { isDialogVisible, setIsDialogVisible } = useContext(DialogContext);
  const { currentItem } = useContext(ProductionItemContext);
  if (!isDialogVisible) return null;
  return (
    <Dialog
      header={
        !!currentItem ? `Edit Production: ${currentItem._id}` : "New Production"
      }
      visible={true}
      onHide={() => setIsDialogVisible(false)}
      className="w-9"
    >
      
    </Dialog>
  );
};
