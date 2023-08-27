const router = require("express").Router();
const multer = require("multer");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");
const auth = require("../middlewares/middleware");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage }).single("myfile");

router.post("/", auth, (req, res) => {
  //store file

  upload(req, res, async (err) => {
    const email = req.header("email");
    //validate request
    if (!req.file) {
      return res.json({ error: "All fields are required" });
    }

    if (err) {
      return res.status(500).send({ error: err.message });
    }

    // store into database
    const file = new File({
      email,
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
     // share:`${process.env.APP_BASE_URL}/files/${uuid4()}`
    });
    const response = await file.save();
    console.log(response);
    const files = await File.find({email});
    res.send(files);
  });
});


//get all files
router.get("/allfiles", auth, async (req, res) => {
  const email = req.header("email");
  const files = await File.find({email});
  res.send(files);
});

//delete files by uuid
router.delete("/:uuid", auth, async (req, res) => {
  const email = req.header("email");
  const response = await File.deleteOne({ uuid: req.params.uuid });
  const files = await File.find({email});
  res.send(files);
});

//delete all files
router.delete("/", auth, async (req, res) => {
  const email = req.header("email");
  const response = await File.deleteMany({email});
  res.send(response);
});

module.exports = router;
