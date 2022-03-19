const express = require("express");
const TableRouter = express.Router();
const Table = require("../models/Table");

TableRouter.post("/getTablebyid", (req, res) => {
    console.log("Fetching Table");
    // Table.findById(req.body._id).exec((err, document) => {
    //   if (err) {
    //     console.log("Table failed to fetch");
    //     res.status(500).json({
    //       message: { msgBody: "Table failed to fetch", msgError: true },
    //     });
    //   } else {
    //     console.log("Table fetched successfully");
    //     res.status(200).json({ Table: document });
    //   }
    // });

    res.status(200).json({ tables: ["abcd", "efgh", "ijklm"] });
  });

// TableRouter.get("/tables", (req, res) => {
//   Table.findById({ _id: req.Table._id })
//     .populate("table")
//     .exec((err, document) => {
//       if (err)
//         res.status(500).json({
//           message: { msgBody: "Error has occured", msgError: true },
//         });
//       else {
//         res.status(200).json({ table: document.table, authenticated: true });
//       }
//     });
// });

module.exports = TableRouter;
