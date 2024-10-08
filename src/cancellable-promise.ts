export interface CancelablePromise<T = any> {
  promise: Promise<T>
  cancel: () => void
}

export function makeCancellablePromise<T>(
  promise: Promise<T>
): CancelablePromise<T> {
  let isCancelled = false

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then((...args) => !isCancelled && resolve(...args))
      .catch((error) => !isCancelled && reject(error))
  })

  return {
    cancel() {
      isCancelled = true
    },
    promise: wrappedPromise,
  }
}
