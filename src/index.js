//__________________________ Import : Necessary Package and Modules ___________________________________________

const express = require("express")
// const bodyParser = require("body-parser")
const route = require("./routes/route")
const { default: mongoose } = require("mongoose")
mongoose.set('strictQuery', true)
const cors= require('cors')

const app = express();

app.use(express.json());
app.use(cors({origin: true, credentials: true}));



app.use(
    function(req,res,next){
        res.setHeader('Access-Control-Allow-Origin','*')
        next()
        
    }
)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

//__________________________ Connection : MongoDB Cluster ___________________________________________


mongoose.connect("mongodb+srv://aliabbasbackendcohort:AMMIabbu321@cluster67.6fp98uh.mongodb.net/database3?retryWrites=true&w=majority", {
   
})
    .then(() => console.log("mongoDb is connected"))
    .catch(err => console.log(err))

app.use("/", route);

//__________________________ Listen : Port ___________________________________________

app.listen(process.env.PORT || 3000, function () {
    console.log("express app running on port" + (process.env.PORT || 3000))
})