import { reactive } from 'vue'

let hideTimer = null

export const errorState = reactive({
  message: null,
  visible: false,

  trigger(msg, duration = 5000) {
    if (hideTimer) clearTimeout(hideTimer)

    this.message = msg
    this.visible = true

    hideTimer = setTimeout(() => {
      this.dismiss()
    }, duration)
  },

  dismiss() {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    this.visible = false
    this.message = null
  },
})
