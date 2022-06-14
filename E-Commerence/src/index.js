const express = require("express") ;
const cors = require('cors') ;
const app = express() ;
const connect = require("./configs/db") ; // connect to database
const port = process.env.PORT ; // port is set in .env file

if (port === null || port === "") {
    port = 3000 ;
}
connect() ; // connect to database
app.use(cors()) ;
app.use(express.json()) ;
app.use(express.urlencoded({ extended: true })) ;
app.use(express.static("public")) ;
app.use("/api", require("./routes/api")) ;
app.use("/", require("./routes/index")) ;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`) ;
});

const listController = require("./controllers/lists.controller")
listController.getLists() ;
app.use("/movies", listController) ;


module.exports = app ;