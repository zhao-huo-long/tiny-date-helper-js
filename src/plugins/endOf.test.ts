import {
  describe,
  expect,
  test
} from '@jest/globals';
import timejs from '../index'
import endOf from './endOf'

timejs.install(endOf)


describe('plugin: endOf', () => {
  test('endOf - year', () => {
    expect(timejs('2022-03-16').endOf('year').str()).toBe(`2022-12-31 23:59:59`)
    expect(timejs('2021-01-02').endOf('year').str()).toBe(`2021-12-31 23:59:59`)
    expect(timejs('2023-03-19').endOf('year').str()).toBe(`2023-12-31 23:59:59`)
  })

  test('endOf - month', () => {
    expect(timejs('2024-02-16').endOf('month').str()).toBe(`2024-02-29 23:59:59`)
    expect(timejs('2022-02-16').endOf('month').str()).toBe(`2022-02-28 23:59:59`)
    expect(timejs('2021-01-02').endOf('month').str()).toBe(`2021-01-31 23:59:59`)
    expect(timejs('2024-04-12').endOf('month').str()).toBe(`2024-04-30 23:59:59`)
  })

  test('endOf - week', () => {
    expect(timejs('2022-06-29').endOf('week').str()).toBe(`2022-07-03 23:59:59`)
    const week = timejs.week
    timejs.week = {
      0: 1,
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 6,
      6: 7,
    }
    expect(timejs('2022-06-29').endOf('week').str()).toBe(`2022-07-02 23:59:59`)
    timejs.week = week
  })
  
  test('endOf - day', () => {
    expect(timejs('2022-06-29').endOf('day').str()).toBe(`2022-06-29 23:59:59`)
  })
});