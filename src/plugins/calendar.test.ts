import {
  describe,
  expect,
  test
} from '@jest/globals';
import timejs from '../index'
import calendar from './calendar'

timejs.install(calendar);

const cnWeek = timejs.week

const foreignWeek = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
}

describe('plugin: calendar', () => {
  test('week num', () => {
    expect(timejs().calender(2023, 7).weekList.length).toBe(6)
    expect(timejs().calender(2023, 6).weekList.length).toBe(5)
    expect(timejs().calender(2021, 2).weekList.length).toBe(4)
    expect(timejs('2021-02', 'YYYY-MM').calender().weekList.length).toBe(4)
    expect(timejs('2023-06', 'YYYY-MM').calender().weekList.length).toBe(5)
    expect(timejs('2023-07', 'YYYY-MM').calender().weekList.length).toBe(6)
  })

  test('week list', () => {
    const list = timejs().calender(2023, 7).weekList.map(i => {
      return i.map(m => m.view)
    })
    expect(list[0][0]).toEqual('2023-06-26')
    expect(list.pop()?.pop()).toEqual('2023-08-06')
  })
});


describe('plugin: calendar (change week)', () => {
  test('change week', () => {
    timejs.week = foreignWeek
    expect(timejs().calender(2021, 2).weekList.length).toBe(5)
    let list = timejs().calender(2023, 7).weekList.map(i => {
      return i.map(m => m.view)
    })
    expect(list[0][0]).toEqual('2023-06-25')
    expect(list.pop()?.pop()).toEqual('2023-08-05')
    timejs.week = cnWeek
  })
})