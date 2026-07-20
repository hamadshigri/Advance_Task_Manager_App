
const sounds = {
  add: '/sounds/add.mp3',
  complete: '/sounds/complete.mp3',
  delete: '/sounds/delete.mp3',
  update: '/sounds/update.mp3'
}

export const playSound = (type) => {
  const sound = sounds[type];
  if(!sound) return;

  const audio = new Audio(sound);
  audio.volume = 0.6;
  audio.play().catch(() => {});
}