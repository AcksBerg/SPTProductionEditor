import { useContext, useState, useEffect } from "react";
import itemList from "./data/item.json";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { saveAs } from "file-saver";
import { ProductionItem } from "./components/ProductionItem";
import { DataViewHeader } from "./components/DataViewHeader";
import { Area, Production } from "./types";
import { ProductionListContext } from "./context/ProductionListContext";
import { EditProductionItem } from "./components/EditProductionItem";
import { PrimeIcons } from "primereact/api";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Card } from "primereact/card";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import initialProductionList from "./data/production.json";
import { InputSwitch } from "primereact/inputswitch";


export const MainApp = () => {
  const {
    productionList,
    setProductionList,
    setIsProductionListMoveAvailable,
    availableAreas,
  } = useContext(ProductionListContext)!;
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area>({
    name: "All",
    areaId: -1,
    maxLevel: 0,
  });
  if (!availableAreas) {
    throw new Error("availableAreas is not available in ProductionListContext");
  }
  const [searchItemName, setSearchItemName] = useState<string>("");
  const [theme, setTheme] = useState<string>("dark");


  useEffect(() => {
    if (availableAreas.length > 0) {
      setSelectedArea(availableAreas[0]);
    }
    setIsProductionListMoveAvailable(searchItemName === "");
  }, [searchItemName, setIsProductionListMoveAvailable]);

  useEffect(() => {
    const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme !== "dark" ? "/themes/viva-light/theme.css" : "/themes/viva-dark/theme.css";
    }
  },[theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const filterDataView = (craft: Production) => {
    if (!selectedArea) return false;
    return searchItemName === ""
      ? craft.areaType === selectedArea.areaId || selectedArea.areaId === -1
      : itemList[craft.endProduct as keyof typeof itemList].name
          .toLowerCase()
          .includes(searchItemName.toLowerCase());
  };

  const saveProductionList = () => {
    const blob = new Blob([JSON.stringify(productionList, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "production.json");
  };

  const customBase64Uploader = async (event: FileUploadHandlerEvent) => {
    const file = event.files[0];
    const reader = new FileReader();
    const objectURL = URL.createObjectURL(file);
    const blob = await fetch(objectURL).then((r) => r.blob());

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      const base64DataUrl = reader.result as string;
      const base64String = base64DataUrl.split(",")[1];
      const jsonString = atob(base64String);
      setProductionList(JSON.parse(jsonString));
    };
  };

  const cardFooter = () => {
    return (
      <>
        <span>Disclaimer:</span>
        <p>
          The default production.json is located at:
          \SPT_Data\Server\database\hideout\
        </p>
        <p>
          This website does not use cookies. Everything runs locally on your
          machine, and no data is transmitted to the server. This means that when
          you reload the website, you will lose your progress. So, don't forget to
          download the production.json file.
        </p>
        <div className="flex justify-content-center mt-2 align-items-center">
          <span className="pi pi-moon"></span>
          <InputSwitch className="mx-2" checked={theme !== "dark"} onClick={toggleTheme}/>
          <span className="pi pi-sun"></span>
        </div>
      </>
    );
  };
  
  return productionList !== undefined ? (
    <>
      <ConfirmDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        message="Are you sure you want to delete ALL productions?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => setProductionList([])}
        reject={() => undefined}
      />
      <Button
        className="p-button-success"
        label="Download"
        onClick={saveProductionList}
        tooltip="Download the modified production.json"
        tooltipOptions={{ position: "mouse" }}
      />
      <Button
        className="p-button-danger ml-2"
        label="Clear production list"
        icon={PrimeIcons.TRASH}
        onClick={() => setDeleteDialogVisible(true)}
        tooltip="Remove every production and start fresh."
        tooltipOptions={{ position: "mouse" }}
      />
      <DataView
        value={productionList?.filter((craft: Production) =>
          filterDataView(craft)
        )}
        itemTemplate={(item) => (
          <ProductionItem item={item} selectedArea={selectedArea} />
        )}
        header={
          <DataViewHeader
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            searchItemName={searchItemName}
            setSearchItemName={setSearchItemName}
            availableAreas={availableAreas}
          />
        }
        paginator
        rows={12}
        className="m-1 mt-2"
      />
      <EditProductionItem />
    </>
  ) : (
    <div className="flex justify-content-center align-items-center">
      <Card
        header="Select one option"
        className="w-6 mt-8 p-3"
        footer={cardFooter}
      >
        <div className="flex justify-content-between">
          <Button
            icon={PrimeIcons.SUN}
            label="New Production List"
            onClick={() => setProductionList([])}
          />
          <Button
            icon={PrimeIcons.STAR}
            label="Default Production List"
            className="mx-2"
            onClick={() => setProductionList(initialProductionList)}
          />
          <FileUpload
            mode="basic"
            accept=".json"
            url="/api/upload"
            uploadHandler={customBase64Uploader}
            customUpload
            auto
            chooseLabel="Upload a Production List"
          />
        </div>
      </Card>
    </div>
  );
};
