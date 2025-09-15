const mongoose = require("mongoose");

const schema = mongoose.Schema;
const stockSchema = new schema({
//id(primary key) will be automtically created when inserting data
    

    item :{
        type : String
    },
    
    

});
                            //file name,function name
const stock =mongoose.model("stocks" ,stockSchema);

module.exports = stock;