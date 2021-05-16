import axios from 'axios'

const peddingMap = new Map()

export const addPeddingRequest = (config) => {
  const {url, method} = config

  const mapKey = [url, method].join('&')

  if(peddingMap.has(mapKey)) {
    const cancel = peddingMap.get(mapKey)
    cancel(mapKey)
    peddingMap.delete(mapKey)
  }

  config.cancelToken = new axios.CancelToken(cancel => {
    peddingMap.set(mapKey, cancel)
  })
}

export const deletePeddingRequest = (config) => {
  const {url, method} = config

  const mapKey = [url, method].join('&')

  peddingMap.delete(mapKey)
}