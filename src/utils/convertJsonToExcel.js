import XLSX from "xlsx";

export const convertJsonToExcel = (data, nameFile) => {
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workBook, workSheet, "list");
  // Generate buffer
  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

  // Binary string
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

  XLSX.writeFile(workBook, nameFile);
};
