/**
 *
 * @desc 获取操作系统类型
 * @return {String}
 */
export function getOS() {
  var userAgent =
    ("navigator" in window &&
      "userAgent" in navigator &&
      navigator.userAgent.toLowerCase()) ||
    "";
  var vendor =
    ("navigator" in window &&
      "vendor" in navigator &&
      navigator.vendor.toLowerCase()) ||
    "";
  var appVersion =
    ("navigator" in window &&
      "appVersion" in navigator &&
      navigator.appVersion.toLowerCase()) ||
    "";

  if (
    /iphone/i.test(userAgent) ||
    /ipad/i.test(userAgent) ||
    /ipod/i.test(userAgent)
  )
    return "ios";
  if (/android/i.test(userAgent)) return "android";
  if (/win/i.test(appVersion) && /phone/i.test(userAgent))
    return "windowsPhone";
  if (/mac/i.test(appVersion)) return "MacOSX";
  if (/win/i.test(appVersion)) return "windows";
  if (/linux/i.test(appVersion)) return "linux";
}
