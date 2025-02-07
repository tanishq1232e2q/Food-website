var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema(
   {
    image:String
   },
   {
    collection:"userimg"
   }
);
 
module.exports = mongoose.model('userimg', imageSchema);