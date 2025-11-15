import Client from "../models/clientModel.js";

const getClientDetails = async (req, res) => {
  try {
    const clientDetails = await Client.find();
    res.status(200).json({
      success: true,
      data: clientDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch client details.",
    });
  }
};

const addClientDetails = async (req, res) => {
  try {
    const { name, email, phoneNumber, address } = req.body;
    const newClient = new Client({
      name,
      email,
      phoneNumber,
      address,
    });
    const savedClient = await newClient.save();
    res.status(201).json({
      success: true,
      data: savedClient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to add client details.",
    });
  }
};

const updateClientDetails = async (req, res) => {
  try {
    const clientId = req.params.id;
    const { name, email, phoneNumber, address } = req.body;
    const updatedClient = await Client.findByIdAndUpdate(
      clientId,
      { name, email, phoneNumber, address },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedClient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to update client details.",
    });
  }
};

const deleteClientDetails = async (req, res) => {
  try {
    const clientId = req.params.id;
    await Client.findByIdAndDelete(clientId);
    res.status(200).json({
      success: true,
      message: "Client details deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to delete client details.",
    });
  }
};
export {
  getClientDetails,
  addClientDetails,
  updateClientDetails,
  deleteClientDetails,
};
