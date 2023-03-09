import moment from "moment";
import "moment-timezone";

const timeFormats = {
  day: "dddd", // 'Saturday'
  monthDay: "MMM Do", // Feb 2nd
  monthDayTime: "MMM D, h:mmA", // Feb 2, 1:44PM
  monthDayYearTime: "MMM D, YYYY [at] h:mmA", // Feb 2, 1:44PM
  monthDayYear: "MMM D, YYYY", // Feb 2, 2016
  monthDayAtTime: "MMM D [at] h:mmA", // Feb 2 at 1:44PM
  monthDayYearAbbr: "MM/DD/YY", // 02/02/16
  time: "h:mmA", // 1:44PM
};

export default class TimeFormatter {
  static format(val, key, timezone = moment.tz.guess()) {
    return moment(val).tz(timezone).format(timeFormats[key]);
  }

  static formatFromNow(val, dropSuffix = false) {
    return moment(val).fromNow(dropSuffix);
  }

  static formatUnix(val, key, timezone = moment.tz.guess()) {
    return moment.unix(val).tz(timezone).format(timeFormats[key]);
  }

  static formatUnixToISOString(val, timezone = moment.tz.guess()) {
    return moment.unix(val).tz(timezone).toISOString();
  }

  static formatUnixFromNow(val, dropSuffix = false) {
    return moment.unix(val).fromNow(dropSuffix);
  }

  static formatUnixWithOffset(val, key, offset) {
    return moment.unix(val).utcOffset(offset).format(timeFormats[key]);
  }
}
