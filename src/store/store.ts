import { Mutation, State } from 'vuex-simple';
import { EventModule } from '@/store/modules/event.modules'


export class MyStore {

  @State()
  public message: any = [];


  @Mutation()
  public setMessages(payload: any) {
    this.message.push(payload) ;
  }

}
