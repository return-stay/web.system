let now = new Date(); // 当前日期
let nowDayOfWeek = now.getDay(); // 今天本周的第几天
let nowDay = now.getDate(); // 当前日
let nowMonth = now.getMonth(); // 当前月
let nowYear = now.getYear(); // 当前年
nowYear += (nowYear < 2000) ? 1900 : 0;
 
const DateUtil = {
  // 获取当前天
  getDay() {
    // console.log(nowMonth)
    let sday = new Date(now.getFullYear(), nowMonth, nowDay,0,0,0)
    let eday = new Date()
    return {
      start: sday,
      end: eday,
    }
  },
  // 获取昨天
  getToday() {
    let sday = new Date(now.getFullYear(), nowMonth, nowDay-1, 0, 0, 0)
    let eday = new Date(now.getFullYear(), nowMonth, nowDay, 0, 0, 0)
    return {
      stoday: sday, 
      etoday: eday
    }
  },
  // 获取最近7天
  get7day() {
    let sday = new Date(now.getFullYear(), nowMonth, nowDay-7, 0, 0, 0)
    let eday = new Date(now.getFullYear(), nowMonth, nowDay)
    return {
      s7day: sday, 
      e7day: eday
    }
  },
  get30Day() {
    let sday = new Date(now.getFullYear(), nowMonth, nowDay-30, 0, 0, 0)
    let eday = new Date(now.getFullYear(), nowMonth, nowDay)
    return {
      s30day: sday, 
      e30day: eday,
    }
  },
  /**
   * 获得当前日期
   * 
   * @returns
   */
  getNowDay() {
    return this.formatDate(new Date());
  },
  /**
   * 获得本周的开始时间
   * 
   * @returns
   */
  getStartDayOfWeek() {
    var day = nowDayOfWeek || 7;
    return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1 - day));
  },
  /**
   * 获得本周的结束时间
   * 
   * @returns
   */
  getEndDayOfWeek() {
    var day = nowDayOfWeek || 7;
    return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 7 - day));
  },
  /**
   * 获得本月的开始时间
   * 
   * @returns
   */
  getStartDayOfMonth() {
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return this.formatDate(monthStartDate);
  },
  /**
   * 获得本月的结束时间
   * 
   * @returns
   */
  getEndDayOfMonth() {
    var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays(nowMonth));
    return this.formatDate(monthEndDate);
  },
  /**
   * 获取指定月天数
   * month 
   * @returns
   */
  getMonthDays(month) {
    var monthStartDate = new Date(nowYear, month, 1);
    var monthEndDate = new Date(nowYear, month + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  },
  /**
   * 获得上月的开始时间
   * 
   * @returns
   */
  getStartDayOfLastMonth() {
    var monthStartDate = new Date(nowYear, nowMonth-1, 1);
    return this.formatDate(monthStartDate);
  },
  /**
   * 获得上月的结束时间
   * 
   * @returns
   */
  getEndDayOfLastMonth() {
    var monthEndDate = new Date(nowYear, nowMonth-1, this.getMonthDays(nowMonth-1));
    return this.formatDate(monthEndDate);
  },
  /**
   * 获得本年的开始 结束时间
   */
  getStartToEndYear() {
    const start = new Date(nowYear, 0, 1)
    const end = new Date(nowYear, nowMonth, nowDay)
    return [start, end]
  },
   /**
   * 获得上年的开始 结束时间
   */
  getStartToEndLastYear() {
    const start = new Date(nowYear-1, 0, 1)
    const end = new Date(nowYear-1, 11, 31, 23, 59, 59)
    return [start, end]
  },
  /**
   * @param 日期格式化
   * @returns {String}
   */
  formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
  }
}
export default DateUtil