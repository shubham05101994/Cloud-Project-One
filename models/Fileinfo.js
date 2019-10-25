const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "User_file_details",
  {
    idUser_file_details: {
      type: Sequelize.INTEGER,
      primaryKey: true
    
    },
    Email_id: {
      type: Sequelize.TEXT,
      autoIncrement: true,
      allowNull: false
    },
    File_description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    Download_link: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    File_upload_time: {
      type: Sequelize.TEXT,
      //defaultValue: Sequelize.NOW
    },
    File_updated_time: {
      type: Sequelize.TEXT
    },
    File_delete_flag: {
      type: Sequelize.INTEGER
    },
    File_deleted_time: {
      type: Sequelize.TEXT
    },
    File_Update_flag: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);
