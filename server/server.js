const express = require("express")
const formidable = require("express-formidable")
const router = require("./router")

const app = express()
const port = process.env.port || 3001
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "accept, authorization, content-type, x-requested-with"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    res.setHeader("Access-Control-Allow-Origin", "*")//req.header("origin"));

    next();
});
app.use(router)

app.listen(port, () => {
    console.log(`Server listening on port ${port} and is ready to accept requests!`);
})