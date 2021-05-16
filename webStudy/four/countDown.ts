
import { EventEmitter } from 'eventemitter';


/**倒计时状态 */
enum CountdownStatus {
  start,
  running,
  stoped
}


/**倒计时触发的事件枚举 */
export enum CountdownEventName {
  START = 'start',
  STOP = 'stop',
  RUNNING = 'running',
}

interface ICountdownEventMap {
  [CountdownEventName.START]: [];
  [CountdownEventName.STOP]: [];
  [CountdownEventName.RUNNING]: [number]; //这些key表示事件名，value表示事件对应的参数
}


export class Countdown extends EventEmitter<ICountdownEventMap> {
//46分钟
  private static COUNT_IN_MILLISECOND: number = 1 * 100;
  private static SECOND_IN_MILLSECOND: number = 10 * Countdown.COUNT_IN_MILLISECOND;
  
  constructor() {
    super()
  }
  
}