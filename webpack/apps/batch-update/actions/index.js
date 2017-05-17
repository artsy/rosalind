export const REQUEST_TOAST = 'REQUEST_TOAST'

export const requestToast = toppings => {
  return {
    type: REQUEST_TOAST,
    toppings: toppings
  }
}
