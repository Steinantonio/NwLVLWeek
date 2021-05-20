import { Timestamp, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid";

@Entity("settings")
class Setting {

  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  chat: boolean;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @CreateDateColumn()
  created_at: Timestamp;

  constructor() { // every time the class is instantiated the constructor runs first
    if (!this.id) {
      this.id = uuid();
    }
  }
};

export { Setting }