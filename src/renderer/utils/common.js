const TokenKey = "token";

export function getToken() {
  return JSON.parse(localStorage[TokenKey] || "{}");
}

export function setToken(token) {
  return (localStorage[TokenKey] = JSON.stringify(token));
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

export function getHistory() {
  return localStorage["history"];
}

export function setHistory(history) {
  return (localStorage["history"] = history);
}

export function removeHistory() {
  return localStorage.removeItem("history");
}

export function timetrans(oldDate) {
  var date = new Date(oldDate); //如果date为13位不需要乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

/**
 * @desc 格式化日期字符串
 * @param { Nubmer} - 时间戳
 * @returns { String } 格式化后的日期字符串
 */
export function formatDate(stringTime) {
  let timestamp = Date.parse(new Date(stringTime));
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let month = day * 30;
  let now = new Date().getTime();
  let diffValue = now - timestamp;
  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
    return "不久前";
  }
  // 计算差异时间的量级
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  // 数值补0方法
  let zero = function(value) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  };
  // 使用
  if (monthC > 4) {
    // 超过1年，直接显示年月日
    return (function() {
      let date = new Date(timestamp);
      return (
        date.getFullYear() +
        "年" +
        zero(date.getMonth() + 1) +
        "月" +
        zero(date.getDate()) +
        "日"
      );
    })();
  } else if (monthC >= 1) {
    return parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    return parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    return parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    return parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    return parseInt(minC) + "分钟前";
  }
  return "刚刚";
}
