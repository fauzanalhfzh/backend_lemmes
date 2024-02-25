import Mahasiswa from "../models/MahasiswaModel.js";
import path from "path";
import fs from "fs";

export const getMahasiswa = async (req, res) => {
  try {
    const response = await Mahasiswa.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMahasiswaById = async (req, res) => {
  try {
    const response = await Mahasiswa.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveMahasiswa = (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No Profile Picture" });
  }

  const nim = req.body.nim;
  const nama_mahasiswa = req.body.nama_mahasiswa;
  const foto_profil = req.files.foto_profil;
  const jenis_kelamin = req.body.jenis_kelamin;
  const no_telp = req.body.no_telp;
  const alamat = req.body.alamat;
  const email = req.body.email;

  const fileSize = foto_profil.data.length;
  const ext = path.extname(foto_profil.name);
  const fileName = foto_profil.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpeg", ".jpg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });

  if (fileSize > 3000000)
    return res.status(422).json({ msg: "Image must be less than 3MB" });

  foto_profil.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Mahasiswa.create({
        nim: nim,
        nama_mahasiswa: nama_mahasiswa,
        foto_profil: fileName,
        jenis_kelamin: jenis_kelamin,
        no_telp: no_telp,
        alamat: alamat,
        email: email,
        status: false,
        url: url,
      });
      res.status(201).json({ msg: "Mahasiswa Berhasil Ditambahkan" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateProduct = async (req, res) => {
  const mahasiswa = await Mahasiswa.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!mahasiswa) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = Mahasiswa.foto_profil;
  } else {
    const foto_profil = req.files.foto_profil;
    const fileSize = foto_profil.data.length;
    const ext = path.extname(foto_profil.name);
    fileName = foto_profil.md5 + ext;
    const allowedType = [".png", ".jpeg", ".jpg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 3000000)
      return res.status(422).json({ msg: "Image must be less than 3MB" });

    const filePath = `./public/images/${mahasiswa.foto_profil}`;
    fs.unlinkSync(filePath);

    foto_profil.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const nim = req.body.nim;
  const nama_mahasiswa = req.body.nama_mahasiswa;
  const jenis_kelamin = req.body.jenis_kelamin;
  const no_telp = req.body.no_telp;
  const alamat = req.body.alamat;
  const email = req.body.email;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Mahasiswa.update(
      {
        nim: nim,
        nama_mahasiswa: nama_mahasiswa,
        foto_profil: fileName,
        jenis_kelamin: jenis_kelamin,
        no_telp: no_telp,
        alamat: alamat,
        email: email,
        status: false,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Mahasiswa Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMahasiswa = async (req, res) => {
  const mahasiswa = await Mahasiswa.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!mahasiswa) return res.status(404).json({ msg: "No Data Found" });
  try {
    if (mahasiswa.foto_profil) {
      const filePath = `./public/images/${mahasiswa.foto_profil}`;
      fs.unlinkSync(filePath);
    }
    await Mahasiswa.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Mahasiswa Deleted Succesfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
