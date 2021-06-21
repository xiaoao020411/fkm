/*
 * 日期格式化
 * @param {string} time - 传入的时间对象
 * @param {string} format - 需要的格式
 * example dateFormat('Tue Mar 06 2012 00:00:00 GMT+0800', 'yyyy-MM-dd')
 * example dateFormat('Tue Mar 06 2012 00:00:00 GMT+0800', 'yyyy/MM/dd HH:mm:ss')
 */
const tf = {
  dateFormat : function (time, format) {
    var t = new Date(time)
    var tf = function (i) {
      return (i < 10 ? '0' : '') + i
    }
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear())
        case 'MM':
          return tf(t.getMonth() + 1)
        case 'mm':
          return tf(t.getMinutes())
        case 'dd':
          return tf(t.getDate())
        case 'HH':
          return tf(t.getHours())
        case 'ss':
          return tf(t.getSeconds())
      }
    })
  }
}
export default  tf;

