const express = require("express");
const path = require("path");
const eh = require("errorhandler");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
const passport = require("passport");
const User = require("./db/users");
const Candidate = require("./db/candidates");
const ObjectID = require("mongodb").ObjectID;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");
const Pusher = require('pusher-js/node')
const cloudinary = require("cloudinary").v2;


//const keys = require("./config/keys");
const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
//"mongodb://127.0.0.1:27017/authdb" ||
const mongodbAPI = "mongodb://127.0.0.1:27017/authdb"; //keys.mongouri;

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());   

app.use("/static", express.static(path.join(__dirname, "../assets")));
//app.use(express.static('../client/public'));

app.use("/static", express.static(path.join(__dirname, "../assets")));

app.use("/usr", require("./routes/routes"));
 
/******************************************************************* */

cloudinary.config({
  cloud_name: "dijjqfsto",
  api_key: "943785761215535",
  api_secret: "MSfacY2b-OGHnjJLiLni9zfH1R0"
});

var pusher = new Pusher('5270bfbdce0a09599eb2', {
  cluster: 'ap2',
  forceTLS: true
});



//app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../",'client', "public", "index.html"));
// });

var options = {
  explorer : true
};
 
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


app.use(eh());

const user = require("./db/users");
//const passport = require("./config/passport");

try {
  mongoose.connect(mongodbAPI, { useNewUrlParser: true }, err => {
    if (!err) console.log("connected to mongodb sucsessfully" + "👍");
  });
} catch (error) {
  console.log(err);
}

mongoose.set("debug", true);





var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  console.log("new candidate recieved")
  console.log(JSON.stringify(data));
  ///home/dealwithit/machine_learning_venv

  const newcandidate = new Candidate({
    email: data.from_email,
    name: data.from_name,
    date: new Date().toISOString()
  });

  newcandidate
    .save()
    .then(result => {
      console.log("file name - "+(data.message));
  //var cvexte = path.extname(req.file.originalname);
  cloudinary.uploader.upload(///home/dealwithit/machine_learning_venv/rajithagunathilake@gmail.com-16.pdf
    "/home/dealwithit/Documents/dev/recaux/assets/cv/" +data.message,
    {
      tags: "basic_sample",
      folder: "recaux/resume",
      public_id: result._id,
      sign_url: true
    },
    function(err, cvuploaddata) {
      console.log();
      console.log("** File Upload");
      if (err) {
        console.warn(err);
      }
      console.log(
        "* public_id for the uploaded pdf is generated by Cloudinary's service."
      );
      console.log("* " + cvuploaddata.public_id);
      console.log("* " + cvuploaddata.url);

      Candidate.updateOne({_id:result._id},{$set:{cvUrl:cvuploaddata.url}}).then(doc=>{
        console.log(cvuploaddata);
      }).catch(err=>{
        
      }) 


      //res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);

      if (err.code === 11000) {
        console.log(" reg err duplicate email found ");

        Candidate.findOne({ email: req.body.candidateemail }).then(
          dupcandoc => {
            console.log("dup can id - " + dupcandoc);
            console.log("dup can id - " + dupcandoc.id);

            //res.status(403).json({ errcode: err.code, dupcanid: dupcandoc.id });
          }
        );
      } else { 
        //res.status(403).json(err);
      }
    });





});

})


app.listen(port, () => {
  console.log("listning on 3001");
});
