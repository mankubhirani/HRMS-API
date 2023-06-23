const express = require("express"),
  path = require("path"),
  app = express(),
  multer = require("multer"),
  bodyParser = require("body-parser");
const router = express.Router();
var dbConn = require("./../../config/db.config");
const attachmentController = require("../controllers/attachment.controller");
const { log } = require("console");

const DIR = "./src/uploads";

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(
      null,
// file.fieldname + "-" + Date.now() + path.extname(file.originalname)
         
      file.originalname

    );
  },
});
let upload = multer({ storage: storage, limits: { fileSize: 52428800 } });
// all environments

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// upload document
router.post("/document", upload.single("profile"), function (req, res) {
  message: "Error! in image upload.";
  if (!req.file) {
    console.log("No file received");
    message = "Error! in image upload.";
    res.render("index", { message: message, status: "error" });
  } else {
    console.log("file received");
    console.log(req);
    // var sql =
    //   "call hrms.sp_insert_documents (`name`, `type`, `size`, `path`, `originalname`,`email`,`company_id`,`document_name`) VALUES ('" +
    //   req.file.filename +
    //   "', '" +
    //   req.file.mimetype +
    //   "', '" +
    //   req.file.size +
    //   "', '" +
    //   req.file.path +
    //   "', '" +
    //   req.file.originalname +
    //   "','" +
    //   req.body.email +
    //    "','" +
    //   req.body.company_id +
    //    "','" +
    //   req.body.document_name +
    //   "' )";

    var sql="call hrms.sp_insert_documents(?,?,?,?,?,?,?,?,?,?,?)";

    var val=[
      req.body.document_name,req.file.filename, req.file.mimetype,req.body.email ,req.body.description,req.file.size,req.file.originalname,req.file.path,req.body.created_at,req.body.company_id,req.body.employee_id
    ]
    // console.log("values.................",val)
    dbConn.query(sql,val, function (err, result) {
      if (err) {
        console.log("error: ", err);
       // result(err, null);
      } else {
        console.log(res);
        //  result(null, res.insertId);
        message = "Attachment Successfully! uploaded";
        res.json({error:false, message: message, status: "success",data:result.insertId });
       
      }
      //    console.log('inserted data');
    });

    //res.render('index',{message: message, status:'success'});
  }
});

message = "";
router.get("/", function (req, res) {
  res.render("index.ejs", message);
});
// router.get("/download", attachmentController.download);
//router.get("/download/:file(*)", attachmentController.download);

// Delete a document with orignalname
router.delete("/:id", attachmentController.delete);

// router.get('/getAll', attachmentController.findAll);


router.get('/:email/:company_id', attachmentController.findByCompanyId);

// Retrieve a single Documents with email
// router.get('/:email', attachmentController.findById);


// Retrieve a single Documents with employee_id
router.get('/getattach/:employee_id/:company_id', attachmentController.findByempId);

router.post('/download', function(req,res,next){
  var file = req.body.filename;
  
  var fileLocation = path.join(__dirname,'../uploads')+'/'+file;
  console.log(fileLocation);
  res.sendFile(fileLocation);
 
});

module.exports = router;
