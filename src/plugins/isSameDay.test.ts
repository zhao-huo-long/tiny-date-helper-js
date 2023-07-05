import {
  describe,
  expect,
  test
} from '@jest/globals';
import timejs from 'tiny-time-js'
import isSameDay from './isSameDay'

timejs.install(isSameDay)

describe('plugin: isSameDay', () => {
  test('today', () => {
    expect(timejs().isSameDay(timejs())).toBe(true)
  })

  test('same day', () => {
    expect(timejs('2022/01/01', 'YYYY/MM/DD').isSameDay(timejs('2022-01-01 01:00:01'))).toBe(true)
    expect(timejs('2033/09/01', 'YYYY/MM/DD').isSameDay(timejs('2033-09-01 01:00:01'))).toBe(true)
    expect(timejs('2033/09/01', 'YYYY/MM/DD').isSameDay(timejs('2033-09-02 01:00:01'))).toBe(false)
  })
});