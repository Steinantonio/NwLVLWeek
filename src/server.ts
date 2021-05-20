import {serverHttp} from "./http";
import "../src/websocket/client"; 

serverHttp.listen(3333, () => console.log("Server up and running on port 3333"));
