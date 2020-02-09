import {Moment} from "moment";

export interface EventItems {
  key: string | null
  event: string | null

}

export interface CalendarArray {
  days: Array<Moment>

}
