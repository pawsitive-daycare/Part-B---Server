
require ('dotenv').config();

const {app} = require('./server.js');
const { dbConnect } = require('./utils/dabase.js');




const PORT = process.env.PORT || 8081;




app.listen(PORT, async () => {

    await dbConnect();
    
    console.log(`App is running, click here ---> http://localhost:${PORT}/`)
});