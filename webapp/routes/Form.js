const express = require("express");
const FormRouter = express.Router();
const Form = require("../models/Form");

FormRouter.post("/getFormbyid", (req, res) => {
    console.log("Fetching Form");
    console.log("Fetching Form", req.body._id);
    Form.findOne({ _id: req.body._id},function(err, form) {
      if (err) {
        console.log(req.body._id);
        console.log("Form failed to fetch");
        console.log(err)
        res.status(500).json({
          message: { msgBody: "Form failed to fetch", msgError: true },
  
        });
      } else {
        console.log(form)
        console.log("Form fetched successfully", form);
        res.status(200).json({ form: form });
      }
    });
  });

// FormRouter.get("/forms", (req, res) => {
//   Company.findById({ _id: req.Form._id })
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

module.exports = FormRouter;
