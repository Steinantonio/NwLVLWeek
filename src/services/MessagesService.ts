import { getCustomRepository, Repository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";
import {Messages} from "../entities/Messages"

interface IMessageService {
  admin_id?: string,
  text: string,
  user_id: string
}

class MessagesService{

  private messagesRepository: Repository<Messages>
 
  constructor(){
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }

  async create({admin_id, text, user_id}: IMessageService){

    const message = await this.messagesRepository.create({
      admin_id,
      text,
      user_id
    })

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(user_id: string){

    const list = await this.messagesRepository.find({
      where : {user_id},
      relations:["user"] // passa o nome da FK na entidade
    })
    return list
  }
}

export{MessagesService}