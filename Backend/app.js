//mongoDB_pwd : UhgdXG1oIShwMf3r
const express= require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser =require("body-parser");
const path = require("path");
const cokkieParser = require("cookie-parser");
require ("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cokkieParser());

// Optional: parse URL-encoded bodies (for forms)
app.use(express.urlencoded({ extended: true }));

//Routes

const usersRouter = require("./routes/clientRoute.js");
app.use("/client" ,usersRouter); 

const lorryCategoriesRouter = require("./routes/lorryCategoryRoute.js");
app.use("/lorryCategories" ,lorryCategoriesRouter); 

const lorryRouter = require("./routes/lorryTypesRoute.js");
app.use("/lorryType" ,lorryRouter); // load lorryRouter when searching http://localhost:5000/lorryType

const lorryBrandsRouter = require("./routes/lorrymodelRoute.js");
app.use("/lorryBrands" ,lorryBrandsRouter);

const requestRouter = require("./routes/requestRoute.js");
app.use("/serviceRequest" ,requestRouter); 

const serviceRouter = require("./routes/servicesRoute.js");
app.use("/service" ,serviceRouter); 

const ordersRouter = require("./routes/ordersRoute.js");
app.use("/orders" ,ordersRouter); 

const quotationRouter = require("./routes/billGeneratorRoute.js");
app.use("/quotations" ,quotationRouter); 

const quotationRequestRouter = require("./routes/quotationRequestsRoute.js");
app.use("/quotationRequest" ,quotationRequestRouter); 

const stocktRouter = require("./routes/stockRouter.js");
app.use("/stock" ,stocktRouter); 


// Make uploads folder public
app.use("/files", express.static(path.join(__dirname, "uploads")));



//MongoDB connection
const MONGODB_URL= process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL,{
    
    useNewUrlParser:true,
    useUnifiedTopology: true,
    
})

.then(() => {
        console.log('Database connected successfully..');
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch(err => console.error('Error in database connecting:', err));