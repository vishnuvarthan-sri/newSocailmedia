var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Account = require('./routes/Account');
var Post = require('./routes/Post');
var app = express();
var multer = require('multer');
var fs = require("fs");
var port = process.env.PORT || 5000;
app.listen(port,  console.log(`Example app listening at http://%s:%s ${port}`));
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*',(req,res)=>{
   res.sendFile(path.join(__dirname,'client','build','index.html'))
  });
}
var cors = require('cors');
app.use(cors());
app.engine('ejs', require('ejs').__express);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs',);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/views', express.static(path.join(__dirname, '/views')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", 'PUT,POST,GET,DELETE,OPTIONS');
  next();
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})
var upload = multer({ storage: storage });


app.post('/login', function (req, res) {
    var email = req.body.email;
    var psw = req.body.psw;

    Account.findOne({email:email, psw:psw }, function (err, user) {
        if(!user){
          res.send({message:"User Not found"})
        }
        else {
          res.send({token:"login"})
        }
        });
    
});

// sign up a new account handler
app.post('/signup', function (req, res) {
    // Insert the new user if they do not exist yet
    var uname = req.body.uname;
    var email = req.body.email;
    var psw = req.body.psw;
    var Cnpsw = req.body.Cnpsw;
    var user = new Account({
      uname:uname,
      email: email,
      psw: psw,
      Cnpsw: Cnpsw
  });

Account.findOne({uname:uname,email:email,psw:psw},function(err,sign){
if(sign){
res.send({message:"Account already exists"})
}
else{
  user.save(function (err) {
    if (err) throw err; 
    else  {
      res.send({token:"Saved"})
    }

}); 
}
})
        
   
});


app.post('/page',  upload.single("photo"),function (req, res) {

  var newImage = new Post();
  if(req.file){
    newImage.photo.data = fs.readFileSync(req.file.path);
    newImage.photo.contentType = req.file.mimetype;
  }
  newImage.text=req.body.text ? req.body.text :"";
  newImage.save(function (err,saved) {
  if (err) {
    res.status(500).send({message:"internal server error"})
  }
  else  {
    res.status(200).send({save:saved})
  }

});   
    
});

app.post('/image',  function(req, res) {

  Post.find({}, function(err, image) {
    if (image) {
      console.log("====Retrieved Image====");
      console.log(image);
      res.send({
        message: "Image successfully found",
        imageData: image,
      });
    }
    else {
      res.status(500).send({message:"Error"})
    }
  })

});
