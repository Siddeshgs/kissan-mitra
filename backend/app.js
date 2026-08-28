//require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const expressValidator = require('express-validator')

const cors=require("cors")
const dotenv = require('dotenv'); 
dotenv.config();

//app
const app=express()

//import routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const farmerRoutes = require("./routes/farmer");
const vegetablesRoutes = require("./routes/vegetables")

//database
const dbURI = process.env.ONLINE_DATABASE || process.env.DATABASE || "mongodb://127.0.0.1:27017/kisaan-portal";
mongoose.connect(dbURI, {
    serverSelectionTimeoutMS: 3000
})
    .then(() => console.log("DB Connected successfully to " + dbURI))
    .catch(err => console.log("DB Connection error (running with offline/unconnected DB):", err.message));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//root route
app.get("/", (req, res) => {
    res.json({ message: "Kisaan Mitra Backend API is running!" });
});

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", farmerRoutes);
app.use("/api", vegetablesRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
