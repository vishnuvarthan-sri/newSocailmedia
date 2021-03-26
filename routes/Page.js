var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://vishnuvarthan:thalavishnu98@cluster0.6ngdn.mongodb.net/vishnuvarthan?retryWrites=true&w=majority');


// creating a new schema for account details
var pageSchema = new Schema({
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


var Page = mongoose.model('Page', pageSchema);
module.exports = Page;


