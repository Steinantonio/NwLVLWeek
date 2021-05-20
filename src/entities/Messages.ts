import { Entity, PrimaryColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("messages")
class Messages {

  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  //working with FK keys, you need to set the relation "one to many etc", you always read the first part of the notation to the class you are assigning with IE
  @JoinColumn({name:"user_id"}) // referencing the column in which this FK refers to 
  @ManyToOne(() => User) //Many 'messages' to one User
  user: User

  @Column()
  user_id: string;

  @Column()
  text: string;

  @UpdateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Messages }