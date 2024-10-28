const app = require("./app")
const dotenv=require("dotenv")

dotenv.config({path:"./config.env"})

const port =process.env.PORT || 2000

app.listen(port, () => {
    console.log(`Express app is running on port: ${port}`);
})