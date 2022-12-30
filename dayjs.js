import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import 'dayjs/locale/ko.js'
dayjs.locale('ko')
dayjs.extend(localizedFormat);
import _ from 'lodash'

// const day = dayjs()
// // console.log("🚀 ~ file: dayjs.js ~ line 6 ~ dayjs", day)
// const dayLT = day.format('L')
// console.log("🚀 ~ file: dayjs.js ~ line 8 ~ dayLT", dayLT)
// const dayY = day.format('YY.M.D.H.m.s')
// console.log("🚀 ~ file: dayjs.js ~ line 10 ~ dayY", dayY)
// const dayKO = day.format("ll LTS")
// console.log("🚀 ~ file: dayjs.js ~ line 12 ~ dayKO", dayKO)

const authnum = [1]
console.log(_.isEmpty(authnum))