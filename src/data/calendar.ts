export interface payloadCalendar {
  key: string;
  event: string

}

export interface mutationCalendar {
  messages: payloadCalendar[]
}
