import { Mutation, State } from 'vuex-simple';
import { EventItems} from "@/data/calendar";


export class MyStore {

  @State()
  public message: Array<EventItems> = [];


  @Mutation()
  public setMessages(payload: EventItems) {
    this.message.push(payload);
  }

}
