const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

//const mongoose = require('mongoose');

// MongoDB connection
// mongoose.connect('mongodb://test:test@ds149724.mlab.com:49724/balance');
// mongoose.Promise = global.Promise;


// set up express app
const app = express();

// Front End
//app.use(express.static('public'));



// Body Parser for Json
app.use(bodyParser.json());



// listen for requests error
app.use(function(err,req,res,next){
  res.status(422).send({error:err.message})
});

// Listen for request
app.listen(process.env.port || 3000, function(){
  console.log("now listen");
});



// files
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './videos/');
  },
  filename: function(req, file, cb){
    cb(null,file.originalname);
  }
});
const upload = multer({storage: storage});


//ipfs

var ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});



// ipfs post
router.post('/ipfs', upload.single('campic'), function(req,res,next){
  if(!req.file){
    console.log("400 no files");
    return res.status(400).send("no files")};

  console.log(req.file);
  //res.send(req.file);
    ipfs.util.addFromFs ("./pics/" + req.file.originalname, function (err, files) {
      // 'files' will be an array of objects containing paths and the multihashes of the files added
            if(err){
             return console.log(err);
            }
            // ipfs.files.cat("QmbdQuGbRFZdeqmK3PJyLV3m4p2KDELKRS4GfaXyehz672", (err, res) =>{
            //   console.log(err, res.toString());
            // })
            console.log(files);
            res.send(files[0].hash);
    });
});
