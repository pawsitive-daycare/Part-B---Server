
require ('dotenv').config();

const {app} = require('./server.js');
const { dbConnect } = require('./utils/dabase.js');




const PORT = process.env.PORT || 8080;




app.listen(PORT, async () => {

    await dbConnect();
    
    console.log("server is running " + PORT)
});