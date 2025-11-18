const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get All contacts
// @desc Get Api/contacts
// @desc access private
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Create contacts
// @desc Post Api/contacts
// @desc access private

const CreateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mandatory to fill");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Get contact with id
// @desc Get Api/contacts/id
// @desc access private

const getParticularContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

// @desc update contacts
// @desc put Api/contacts/:id
// @desc access private

const UpdateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("no contact with such id exist");
  }
  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("user can't access other user's contacts");
  }
  const Updatedcontact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(Updatedcontact);
});

// @desc delete contact
// @desc Delete Api/contacts/:id
// @desc access private

const DeleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("no user with this id exists");
  }
  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("user can't delete other user's contacts");
  }
  const deletdconatct = await Contact.findByIdAndDelete(id);
  res.status(200).json("contact deleted");
});
module.exports = {
  getContact,
  CreateContact,
  getParticularContact,
  UpdateContact,
  DeleteContact,
};
