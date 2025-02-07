var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema(
   {
    image:String
   },
   {
    collection:"imagelist"
   }
);
 
module.exports = mongoose.model('imagelist', imageSchema);