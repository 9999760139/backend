const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc get all contact
// @routes GET /api/contact
// @access public
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    if (!contacts) {
        res.status(404).json("Contact not found")
    }
    res.status(200).json(contacts)
});

// @desc create all contact
// @routes POST /api/contact
// @access public
const createContact = asyncHandler(async (req, res) => {
    console.log('req', req.body)
    const { name, email, phone } = req.body
    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
        // res.status(400).json({ message: "All Feilds are Required" })
        res.status(400);
        throw new Error("All Feilds are Mandatary")
    }
    const contact = await Contact.create({
        name, email, phone,
        user_id: req.user.id
    })
    res.status(201).json(contact)
});

// @desc update all contact
// @routes PUT /api/contact
// @access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contact")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})

// @desc delete all contact
// @routes DELETE /api/contact
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete other user contact")
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact)
})

// @desc get all contact
// @routes GET /api/contact
// @access public
const getOneContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

module.exports = { getContact, createContact, updateContact, deleteContact, getOneContact };