import { Mutation, State } from 'vuex-simple';
import { eventItems} from "@/data/calendar";


export class MyStore {

  @State()
  public message: Array<eventItems> = [];


  @Mutation()
  public setMessages(payload: eventItems) {
    this.message.push(payload);
  }

}
