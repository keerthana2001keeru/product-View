const multer = require("multer");
const path = require("path");
const upload = function () {
  const storage = multer.diskStorage({
    destination: "./public/img/productImges",
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const fileFilter = (req, file, cb) => {
    const allowedMineType = ["image/jpg", "image/png", "image/jpeg"];
    if (allowedMineType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, PNG, and GIF files are allowed."
        ),
        false
      );
    }
  };

  const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: fileFilter,
  }).array("image",5);
  return upload;
};

module.exports = { upload };
