import {Component, Prop} from 'vue-property-decorator';
import {VueComponent} from '@/shims-vue';
import moment from 'moment'
import {useStore} from 'vuex-simple';
import {MyStore} from '@/store/store';


import styles from './Calendar.css?module'


@Component
export default class Calendar extends VueComponent {

  public store: MyStore = useStore(this.$store);

  weekDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  eventMessages: string | undefined = ''
  keyTimeStamp: string = '';
  nowData: any = '';
  month: string | null = null;
  day: string | null = null


  render() {
    let self = this;


    function getEventBlock() {
      if (self.keyTimeStamp) {
        return (
          <div class={styles.event_body}>
            <span class={styles.event_body_tittle}>События: {self.nowData.format('dd-DD-MM')}</span>
            <div class={styles.input_container}>
              <input on-keyup={(e) => {
                if (e.keyCode === 13) {
                  self.store.setMessages({
                    key: self.keyTimeStamp,
                    event: self.eventMessages
                  })
                  e.target.value = ''
                }
              }}
                     on-input={(e) => {
                       if (e.target.value) {
                         self.eventMessages = e.target.value
                       }
                     }}/>
            </div>
            <ul>
              {self.store.message.filter(res => {
                console.error(res.key)
                return res.key === self.keyTimeStamp
              }).map(res => {
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
              Кликните по дате что бы узнать события
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
                  {items.days.map((itemsTime, i) => {
                    const days = itemsTime.format('D')
                    const daysTimeStamp = itemsTime.format('X')
                    const month = itemsTime.format('M')
                    let store = this.store.message && this.store.message.length > 0 ? this.store.message : null;
                    if (store) {
                      store = store.map(key => key.key)
                    }
                    return (
                      <td on-click={() => {
                        if (month === this.month) this.pickDate(itemsTime)
                      }}
                          class={[daysTimeStamp === this.keyTimeStamp ? styles.activity : '', month !== this.month ? styles.hidden : '', days === this.day ? styles.active : "", store && store.find((id: string) => id === daysTimeStamp) ? styles.red : '']}>
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

  get getCalendar() {
    return this.calendarConstructor()
  }


  momentLocale() {
    moment.locale('ru')
  }

  pickDate(val) {
    this.keyTimeStamp = val.format('X')
    this.nowData = val

  }

  calendarConstructor() {
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

