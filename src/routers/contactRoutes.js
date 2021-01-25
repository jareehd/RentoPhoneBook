const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");
const auth = require("../middleware/auth");

// creating a contact
router.post("/contact", auth, async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (e) {
    res.status(400).send(e);
  }
});

// updating contact
router.post('/contact/:id', auth , async(req,res)=>{
  try{    
      const contact = await Contact.findByIdAndUpdate( 
          req.params.id , req.body ,
          {new:true ,runValidators:true}    
      )  
      if(!contact) return res.status(400).send('Not a valid Contact')
      res.send(contact)
  }catch(e){
      res.status(400).send(e)
}})

// deleting contact
router.delete('/contact/:id', auth , async(req,res)=>{
  try{
      const contact = await Contact.findByIdAndDelete({_id:req.params.id})
      if(!contact) res.status(400).send('Not a valid Contact')
      res.send(contact)
  }catch(e){
      res.status(400).send(e)
  }
})



module.exports = router;