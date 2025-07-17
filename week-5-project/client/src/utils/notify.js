export function playSound() {
  const audio = new Audio('/notification.mp3'); // Place notification.mp3 in public/
  audio.play();
}

export function showBrowserNotification(title, options) {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
}

export function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}