const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage }).single("myfile");

router.post("/", (req, res) => {
  //store file

  upload(req, res, async (err) => {
    //validate request
    if (!req.file) {
      return res.json({ error: "All fields are required" });
    }

    if (err) {
      return res.status(500).send({ error: err.message });
    }
    
    // store into database
    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    const files = await File.find();
    res.send(files);

  });

});


//get all files
router.get("/allfiles", async (req, res) => {
  const files = await File.find();
  console.log(files);
  res.send(files);
});


//delete files by uuid
router.delete("/:uuid", async (req, res) => {
  const response = await File.deleteOne({ uuid: req.params.uuid });
  const files = await File.find();
  console.log(files);
  res.send(files);
});

//delete all files
router.delete("/",async(req,res)=>{
  const response= await File.deleteMany({});
  res.send(response);
})


module.exports = router;
