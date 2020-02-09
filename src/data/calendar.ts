import {Moment} from "moment";

export interface eventItems {
  key: string | null
  event: string | null

}

export interface mutationCalendar{
  messages: eventItems[] | null
}

export interface CalendarArray {
  days: Array<Moment>

}
