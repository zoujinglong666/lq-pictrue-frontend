import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.extend(isLeapYear);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
dayjs.locale('zh-cn');

/**
 * 格式化日期
 */
export function formatDate(date: string | number | Date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format);
}

/**
 * 时间戳转日期字符串
 */
export function timestampToDate(timestamp: number, format = 'YYYY-MM-DD HH:mm:ss') {
  if (timestamp < 1e12) {
    timestamp = timestamp * 1000;
  }
  return dayjs(timestamp).format(format);
}

/**
 * 获取相对时间
 */
export function fromNow(date: string | number | Date) {
  return dayjs(date).fromNow();
}

/**
 * 获取当前时间
 */
export function now(format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs().format(format);
}

/**
 * 日期字符串转时间戳（毫秒）
 */
export function dateToTimestamp(date: string | Date) {
  return dayjs(date).valueOf();
}

/**
 * 获取本周的起止日期
 */
export function getCurrentWeekRange(format = 'YYYY-MM-DD') {
  const start = dayjs().startOf('week').format(format);
  const end = dayjs().endOf('week').format(format);
  return { start, end };
}

/**
 * 获取本月的起止日期
 */
export function getCurrentMonthRange(format = 'YYYY-MM-DD') {
  const start = dayjs().startOf('month').format(format);
  const end = dayjs().endOf('month').format(format);
  return { start, end };
}

/**
 * 获取本年的起止日期
 */
export function getCurrentYearRange(format = 'YYYY-MM-DD') {
  const start = dayjs().startOf('year').format(format);
  const end = dayjs().endOf('year').format(format);
  return { start, end };
}

/**
 * 日期加减
 * @param date 基准日期
 * @param amount 加减数量
 * @param unit 单位（'day' | 'month' | 'year' | 'hour' | 'minute' | 'second'）
 * @param format 格式化字符串
 */
export function addDate(date: string | number | Date, amount: number, unit: dayjs.ManipulateType, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).add(amount, unit).format(format);
}
export function subtractDate(date: string | number | Date, amount: number, unit: dayjs.ManipulateType, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).subtract(amount, unit).format(format);
}

/**
 * 判断是否为闰年
 */
export function isLeap(date: string | number | Date) {
  return dayjs(date).isLeapYear();
}

/**
 * 获取星期几（中文）
 */
export function getWeekday(date: string | number | Date) {
  const weekMap = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  return weekMap[dayjs(date).day()];
}

/**
 * 日期比较
 * @returns 1: date1 > date2, -1: date1 < date2, 0: 相等
 */
export function compareDate(date1: string | number | Date, date2: string | number | Date) {
  const d1 = dayjs(date1);
  const d2 = dayjs(date2);
  if (d1.isAfter(d2)) return 1;
  if (d1.isBefore(d2)) return -1;
  return 0;
}

/**
 * 获取某月天数
 */
export function getDaysInMonth(date: string | number | Date) {
  return dayjs(date).daysInMonth();
} 