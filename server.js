const express = require("express");
const cors = require ("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const restaurantRouter = require("./router/restaurant.router");
const db = require("./models/index");
const role = db.role;
//dev mode
/*db.sequalize.sync({force:true}).then(()=>{
    console.log('Drop and resync DB ');
    initial();
})*/

function initial(){
    role.create({
        id:1,
        name:'user'
    });
    role.create({
        id:2,
        name:'moderator'
    });
    role.create({
        id:3,
        name:'admin'
    });
}

const sql = require("./models/db")
const PORT = 4000;

//create service
const app = express();
//USe middleware
app.use(express());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//swa
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/" , (req,res)=> {
    res.send("<h1>This is a restaurant  API </h1>");
    //RESTful API for restaurant
})

app.use("/", restaurantRouter);
require("./router/auth.router")(app);


app.listen(PORT, () =>{
    console.log("Server is running on http://localhost:" + PORT);
})