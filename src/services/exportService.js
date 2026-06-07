import * as XLSX from "xlsx";

export const exportExcel = (
  bills
) => {

  const worksheet =
    XLSX.utils.json_to_sheet(
      bills
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Bills"
  );

  XLSX.writeFile(
    workbook,
    "Bills.xlsx"
  );
};

export const exportCSV = (
  bills
) => {

  const worksheet =
    XLSX.utils.json_to_sheet(
      bills
    );

  const csv =
    XLSX.utils.sheet_to_csv(
      worksheet
    );

  const blob = new Blob(
    [csv],
    {
      type:
        "text/csv;charset=utf-8;"
    }
  );

  const link =
    document.createElement("a");

  link.href =
    URL.createObjectURL(blob);

  link.download =
    "Bills.csv";

  link.click();
};