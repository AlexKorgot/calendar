import { Mutation, State } from 'vuex-simple';

export class EventModule {
  @State()
  public message: string[] = [];


  @Mutation()
  public setMessages(payload: string) {
    this.message.push({payload}) ;
  }


}
