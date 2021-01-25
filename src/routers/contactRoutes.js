const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");
const auth = require("../middleware/auth");

router.post("/contact", auth, async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send("successful");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;