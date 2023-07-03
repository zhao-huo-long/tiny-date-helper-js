import {
  describe,
  expect,
  test
} from '@jest/globals';
import timejs from './index'


describe('create', () => {
  test('create by str', () => {
    expect(timejs('2022-01-03 01:22:22').str()).toBe('2022-01-03 01:22:22')
  })

  test('create by date', () => {
    expect(timejs(new Date('2022/08/03 23:12:22')).str()).toBe('2022-08-03 23:12:22')
  })

  // test('create by number', () => {
    // expect(timejs(1318781876406).str()).toBe('2011-10-17 00:17:56')
  // })

  test('create by date-helper', () => {
    const dateHelper = timejs('2012-02-03 01:22:22')
    expect(timejs(dateHelper).str()).toBe('2012-02-03 01:22:22')
  })
});

describe('date text parse', () => {
  test('YYYY-MM-DD hh:mm:ss', () => {
    const str = `2008-01-02 23:49:30`
    expect(timejs(str).str()).toBe(str)
  })

  test('YYYY/MM/DD', () => {
    const str = `2208/01/02 04:49:30`
    expect(timejs(str, `YYYY/MM/DD`).str(`YYYY-MM-DD`)).toBe(`2208-01-02`)
  })

  test(`MM/DD/YYYY`, () => {
    const str = `02/01/2208 04:49:30`
    expect(timejs(str, `MM/DD/YYYY`).str(`YYYY-MM-DD`)).toBe(`2208-02-01`)
  })

  test('YYYY/MM/MM/DD hh:mm:ss', () => {
    const str = `2208/01/01/02 04:49:30`
    expect(timejs(str, `YYYY/MM/MM/DD hh:mm:ss`).str()).toBe(`2208-01-02 04:49:30`)
  })


  test('YYYYMMDD hh:mm:ss', () => {
    const str = `22080102 04:49:30`
    expect(timejs(str, `YYYYMMDD hh:mm:ss`).str()).toBe(`2208-01-02 04:49:30`)
  })

  test('YYYY', () => {
    const str = `22080102`
    expect(timejs(str, `YYYY`).str(`YYYYYYYY`)).toBe(`22082208`)
  })
});


describe('str()', () => {
  test('YYYY-MM-DD hh:mm:ss', () => {
    const str = `2008-01-02 23:49:30`
    expect(timejs(str).str()).toBe(str)
  })

  test('YYYY/MM/DD', () => {
    const str = `2208/01/02`
    expect(timejs(str, `YYYY/MM/DD`).str(`YYYY/MM/DD`)).toBe(`2208/01/02`)
  })

  test('MM/DD/YYYY', () => {
    const str = `02/01/2208`
    expect(timejs(str, `MM/DD/YYYY`).str(`MM/DD/YYYY`)).toBe(`02/01/2208`)
  })

  test('hh:mm:ss', () => {
    expect(timejs(`04:49:30`, `hh:mm:ss`).str(`hh:mm:ss`)).toBe(`04:49:30`)
    expect(timejs(`49:30:04`, `mm:ss:hh`).str(`mm:ss:hh`)).toBe(`49:30:04`)
  })

  test('YYYY MM', () => {
    const str = `2208 02`
    expect(timejs(str, `YYYY MM`).str(`YYYY MM`)).toBe(`2208 02`)
  })
});
