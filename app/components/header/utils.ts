export const triggerTinyScrollAdjustment = (callback?: () => void) => {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, left: 1, behavior: 'smooth' })
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    callback?.() // 如果有回调，则在滚动完成后调用
  })
}

export const scrollToBottom = () => {
  if (typeof window === 'undefined') return
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
}
