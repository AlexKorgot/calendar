import {Component, Prop} from 'vue-property-decorator';
import {VueComponent} from '@/shims-vue';
import moment, {Moment} from 'moment'
import {useStore} from 'vuex-simple';
import {MyStore} from '@/store/store';

import styles from './Calendar.css?module'
import {eventItems, CalendarArray} from "@/data/calendar";


@Component
export default class Calendar extends VueComponent {

  public store: MyStore = useStore(this.$store);

  weekDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  eventMessages: string | null = null
  keyTimeStamp: string | null = null;
  month: string | null = null;
  day: string | null = null


  render() {
    let self = this;


    function getEventBlock() {
      if (self.keyTimeStamp) {
        return (
          <div class={styles.event_body}>
            <span class={styles.event_body_tittle}>События</span>
            <div class={styles.input_container}>
              <input on-keyup={(e: { keyCode: number; target: { value: string; }; }) => {
                if (e.keyCode === 13) {
                  self.store.setMessages({
                    key: self.keyTimeStamp,
                    event: self.eventMessages
                  })
                  e.target.value = ''
                }
              }}
                     on-input={(e: { target: { value: string | null; }; }) => {
                       if (e.target.value) {
                         self.eventMessages = e.target.value
                       }
                     }}/>
            </div>
            <ul>
              {self.store.message.filter((res: eventItems) => {
                return res.key === self.keyTimeStamp
              }).map((res: eventItems) => {
                return (
                  <li class={styles.li_event}>
                    {res.event}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      } else {
        return (
          <div class={styles.event_body}>
            <div class={styles.event_body_void}>
              Кликните по дате что бы внести события
            </div>
          </div>
        )
      }
    }

    return (
      <div class={styles.container}>
        <div class={styles.calendar_body}>
          <span class={styles.calendar_body_tittle}>{moment().format('MMMM YYYY')}</span>
          <table class={styles.table}>
            <thead>
            <tr>
            </tr>
            <tr>
              {this.weekDays.map(day => {
                return (
                  <th>
                    {day}
                  </th>
                )
              })}
            </tr>
            </thead>
            <tbody>
            {this.getCalendar.map((items) => {
              return (
                <tr>
                  {items.days.map((itemsTime: Moment) => {
                    const days = itemsTime.format('D')
                    const daysTimeStamp = itemsTime.format('X')
                    const month = itemsTime.format('M')
                    let store;
                    if (this.store.message && this.store.message.length > 0) {
                      store = this.store.message.map((key: eventItems) => key.key)
                    }
                    return (
                      <td on-click={() => {
                        if (month === this.month) this.pickDate(itemsTime)
                      }}
                          class={[daysTimeStamp === this.keyTimeStamp ? styles.activity : '', month !== this.month ? styles.hidden : '', days === this.day ? styles.active : "", store && store.find((id) => id === daysTimeStamp) ? styles.red : '']}>
                        {days}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
        {getEventBlock()}
      </div>
    )
  }

  get getCalendar(): Array<CalendarArray> {
    return this.calendarConstructor()
  }


  momentLocale(): void {
    moment.locale('ru')
  }

  pickDate(val: Moment) {
    this.keyTimeStamp = val.format('X')

  }

  calendarConstructor(): Array<CalendarArray> {
    const startWeek = moment().startOf('month').week();
    const endWeek = moment().endOf('month').week();
    let calendar = []
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push({
        days: Array(7).fill(0).map((n, i) => {
          return moment().week(week).startOf('week').clone().add(n + i, 'day')
        }),
      })
    }
    return calendar
  }

  created() {
    this.momentLocale()
    this.month = moment().format('M')
    this.day = moment().format('D')

  }
}

