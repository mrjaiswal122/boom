var multer= require("multer");
var path=require('path');
const{v4:uuidv4}=require('uuid');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'backend/public/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = uuidv4();
      cb(null,uniqueSuffix +path.extname(file.originalname))
    }
  });
  const upload = multer({ storage: storage });

  module.exports= upload;