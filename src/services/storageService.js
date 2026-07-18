export const getBills = () => {
  return JSON.parse(
    localStorage.getItem("bills")
  ) || [];
};
   
export const saveBill = (bill) => {
  const bills = getBills();

  bills.push(bill);

  localStorage.setItem(
    "bills",
    JSON.stringify(bills)
  );
};

export const deleteBill = (invoiceNo) => {
  const bills = getBills().filter(
    (bill) => bill.invoiceNo !== invoiceNo
  );

  localStorage.setItem(
    "bills",
    JSON.stringify(bills)
  );
};

export const clearBills = () => {
  localStorage.removeItem("bills");
};