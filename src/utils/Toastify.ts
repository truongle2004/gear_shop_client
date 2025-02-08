import { toast, ToastOptions } from 'react-toastify'

export const ToastifySuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, options)
}

export const ToastifyWarn = (message: string, options?: ToastOptions) => {
  toast.warn(message, options)
}

export const ToastifyError = (message: string, options?: ToastOptions) => {
  toast.error(message, options)
}
