let introPlayedThisPageLoad = false;

export function hasImmersiveIntroPlayed() {
  return introPlayedThisPageLoad;
}

export function markImmersiveIntroPlayed() {
  introPlayedThisPageLoad = true;
}
