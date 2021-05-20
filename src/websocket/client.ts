import { io } from "../http";
import {ConnectionsService} from "../services/ConnectionsService";
import {UserService} from "../services/UserService";
import {MessagesService} from "../services/MessagesService";

interface Iparams {
  text : string,
  email: string
}
 
io.on("connect", (socket) => {
  socket.on("client_first_access", async (params) => {

    const connectionService = new ConnectionsService();
    const userService = new UserService();
    const messageService = new MessagesService();

    const socket_id = socket.id;
    const {text, email } = params as Iparams; 
    let user_id = null;

    const userExists = await userService.findByEmail(email);

    if (!userExists) {
      const user = await userService.create(email);

      await connectionService.create({
        socket_id: socket.id,
        user_id: user.id         
      })

      user_id = user.id; 

    } else {
      user_id = userExists.id;
      const connection = await connectionService.findByUserId(userExists.id);

      if (!connection){
        await connectionService.create({
          socket_id,
          user_id: userExists.id
        })
      }else {
        connection.socket_id = socket.id;
        await connectionService.create(connection)
      }      
    }

    messageService.create({text,user_id});

    const allMessages = await messageService.listByUser(user_id);

    socket.emit("client_list_all_messages", allMessages);

  })
})