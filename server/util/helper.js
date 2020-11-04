const db = require("../database/db");

// converting time data to milliseconds from epoch time
const convertTime = (date) => {
  // remove space from date string
  const dateString = date.replace(/\s/g, "");
  // converting time to milliseconds from epoch time
  let dateTime = new Date(dateString).getTime();
  return dateTime;
};

// converting time data to milliseconds from epoch time
exports.convertTime = convertTime;
exports.returnableDate = async (date) => {
  const dateTime = convertTime(date);
  const add30Days = 30 * 24 * 60 * 60 * 1000;
  // add 30 days to purchased time in transaction
  const returnableDate = dateTime + add30Days;
  return returnableDate;
};
/*
  Filtering all products of a transaction into: 
  - returnable products
  - non-returnable products (with reason why it is not returnable)
*/
exports.prodsFilter = (transaction, currentDate, returnDate) => {
  const prodNotOnSale = [];
  const prodIdOnSale = [];
  const filtered = {
    returnable: [],
    notReturnable: [],
  };

  // check for date
  if (currentDate > returnDate) {
    filtered.returnable = [];
    transaction.prods.map((prod) => {
      const product = db.findProduct(prod.id);
      filtered.notReturnable.push({
        ...product,
        reason: "Product was purchased for more than 30 days",
      });
    });
    return filtered;
  }

  // check whether product is on sale when purchased
  transaction.prods.map((product) => {
    !product.onsale
      ? prodNotOnSale.push(product.id)
      : prodIdOnSale.push(product.id);
  });

  prodIdOnSale.map((id) => {
    const product = db.findProduct(id);
    filtered.notReturnable.push({
      ...product,
      reason: "This Product was On Sale when purchased",
    });
  });

  // check whether product is returnable
  prodNotOnSale.map((id) => {
    const product = db.findProduct(id);
    if (product.returnable) {
      filtered.returnable.push(product);
    } else {
      filtered.notReturnable.push({
        ...product,
        reason: "This Product is not Returnable",
      });
    }
  });

  return filtered;
};
