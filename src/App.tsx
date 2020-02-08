import { Component, Vue } from 'vue-property-decorator';
import Calendar from './components/HelloWorld';

import './App.css'

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <img alt="Vue logo" src={require('./assets/img/logo.png')} />
        <Calendar/>
      </div>
    )
  }
}
