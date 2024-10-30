export const triggerTinyScrollAdjustment = (callback?: () => void) => {
  window.scrollTo(0, 1)
  requestAnimationFrame(() => {
    window.scrollTo(0, 0)
    callback?.() // 如果有回调，则在滚动完成后调用
  })
}
