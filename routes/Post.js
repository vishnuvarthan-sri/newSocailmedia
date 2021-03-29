var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://vishnuvarthan:thalavishnu98@cluster0.6ngdn.mongodb.net/vishnuvarthan?retryWrites=true&w=majority');


// creating a new schema for post details
var postSchema = new Schema({
    text: { type: String, required: true },
    photo:{data: Buffer, contentType: String}   
});

var db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});


var Post = mongoose.model('Post', postSchema);
module.exports = Post;


