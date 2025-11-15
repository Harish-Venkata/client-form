import express from "express";
import {
  addClientDetails,
  deleteClientDetails,
  getClientDetails,
  updateClientDetails,
} from "../controllers/clientController.js";

const router = express.Router();

router.get("/clients", getClientDetails);
router.post("/clients", addClientDetails);
router.patch("/clients/:id", updateClientDetails);
router.delete("/clients/:id", deleteClientDetails);

export default router;
