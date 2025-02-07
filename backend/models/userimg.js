var mongoose = require('mongoose');
var userimageSchema = new mongoose.Schema(
   {
    image:String
   },
   {
    collection:"userlist"
   }
);
 
module.exports = mongoose.model('userlist', userimageSchema);