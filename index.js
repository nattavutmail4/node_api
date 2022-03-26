const express = require('express');
const cors = require('cors');
const app  = express();

let corsOptions = {
    origin:"http://localhost:3030"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

//parse requests of content-type -application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true})); /* bodyParser.urlencoded() is deprecated */

//simple route

app.get('/',(req,res)=>{
    res.json({message:'Welcom Node Express'});
})

require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/music.routes.js")(app);

//SET PORT AND LISTEN FOR REQUESTS
const PORT = process.env.PORT || 3030;

app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});



