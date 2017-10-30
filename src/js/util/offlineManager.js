export default class OfflineManager {
  static setOffline(isOffline) {
    if (isOffline) {
      document.body.classList.add("offline");
    } else {
      document.body.classList.remove("offline");
    }
  }
}
