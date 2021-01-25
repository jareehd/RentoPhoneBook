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

// fetching contact data max 10 per page
router.get('/contact', auth , async (req, res) => {
  
  const { page = 1 , name = null , email = null } = req.query;
  const limit = 10
  try {
    
    const contacts = await Contact.find({name})
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
      

    const count = await Contact.countDocuments();

    res.json({
      contacts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
});


module.exports = router;