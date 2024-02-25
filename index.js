import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import MahasiswaRoute from "./routes/MahasiswaRoute.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(MahasiswaRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
