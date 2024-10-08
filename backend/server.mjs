import https from "https";
import fs from "fs";
import app from "./app.mjs";
import users from "./routes/users.js"
import index from "./routes/index.js"
import express from "express"
import cors from "cors"


//see the prot
const PORT =3001;

const app = express();
app.use(express.json());



const opetions = {
    key: fs.readFileSync('keys/prvatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}

app.use(cors());
app.use(express.json());

app.use((reg,res,next)=>
{
    res.setHeader('Access-COntrol-Allow-Origin', '*');
    res.setHeader('Access-COntrol-Allow-Headers', '*');
    res.setHeader('Access-COntrol-Allow-Methods', '*');
next();

})

app.use("/index", index);
app.route("/index", index);
app.use("/users", users);
app.route("/users", users);
let server = https.createServer(options,app)
console.log(PORT)

server.listen(PORT);

