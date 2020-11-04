const db = require("../database/db");
const helper = require("../util/helper");

exports.postId = async (req, res) => {
  const id = req.body.id;
  const currentDate = helper.convertTime(req.body.currentDate);
  try {
    const transaction = await db.findTransaction(id);
    if (transaction) {
      /*
        Getting the last returnable date for the transaction
      */
      const returnDate = await helper.returnableDate(
        transaction.transaction_date
      );
      const returnDateFormatted = new Date(returnDate).toLocaleString();

      /*
        Filtering all products of a transaction into: 
          - returnable products
          - non-returnable products 
          (with reason why it is not returnable)
      */
      const filtered = helper.prodsFilter(transaction, currentDate, returnDate);

      const productData = {
        transactionId: id,
        lastReturnDate: returnDateFormatted,
        returnableProds: filtered.returnable,
        notReturnableProds: filtered.notReturnable,
      };

      res.status(201).json(productData);
    } else {
      res.status(201).json({ error: "No Transaction Found" });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
