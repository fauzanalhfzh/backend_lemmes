import { DataTypes, Sequelize } from "sequelize";

import db from "../config/Database.js";

const { DataType } = Sequelize;

const Mahasiswa = db.define(
  "mahasiswa",
  {
    nim: DataTypes.STRING,
    nama_mahasiswa: DataTypes.STRING,
    foto_profil: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    alamat: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Mahasiswa;

(async () => {
  await db.sync();
})();
