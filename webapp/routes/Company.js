const express = require("express");
const companyRouter = express.Router();
const Company = require("../models/Company");
const Form = require("../models/Form");

companyRouter.post("/getcompanybycik", (req, res) => {
  // Get the company id and return the company document

  console.log("Fetching Company", req.body._id);
  Company.findOne({ _id: req.body._id},function(err, company) {
    if (err) {
      console.log(req.body._id);
      console.log("Company failed to fetch");
      console.log(err)
      res.status(500).json({
        message: { msgBody: "Company failed to fetch", msgError: true },

      });
    } else {
      console.log(company)
      console.log("Company fetched successfully", company);
      res.status(200).json({ company: company });
    }
  });

})
// companyRouter.get("/forms", (req, res) => {
//   Company.findById({ _id: req.company._id })
//     .populate("form")
//     .exec((err, document) => {
//       if (err)
//         res.status(500).json({
//           message: { msgBody: "Error has occured", msgError: true },
//         });
//       else {
//         res.status(200).json({ form: document.form, authenticated: true });
//       }
//     });
// });

module.exports = companyRouter;
