import express from 'express';
import "./database";
import {routes} from "./routes"; 
import {createServer} from "http";
import {Server,Socket} from "socket.io";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request,response)=>{
  return response.render("html/client.html")
})

const serverHttp = createServer(app); // criando o protocolo http
const io = new Server(serverHttp); // criando o protocolo do Web socket 

io.on("connection", (socket: Socket)=>{
  console.log("connected", socket.id)
})

app.use(express.json());
app.use(routes);

export {serverHttp, io}