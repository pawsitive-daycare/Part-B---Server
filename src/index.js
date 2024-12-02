

import app from "./server";

const PORT = process.env.PORT || 8080;




app.listen(PORT, async() => {

    await dbConnect();

    
    console.log("server is running " + PORT)
});