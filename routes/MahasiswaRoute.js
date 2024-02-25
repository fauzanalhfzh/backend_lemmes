import express from "express";
import {
  getMahasiswa,
  getMahasiswaById,
  saveMahasiswa,
  updateProduct,
  deleteMahasiswa,
} from "../controllers/MahasiswaController.js";

const router = express.Router();

router.get("/mahasiswa", getMahasiswa);
router.get("/mahasiswa/:id", getMahasiswaById);
router.post("/mahasiswa", saveMahasiswa);
router.patch("/mahasiswa/:id", updateProduct);
router.delete("/mahasiswa/:id", deleteMahasiswa);

export default router;
