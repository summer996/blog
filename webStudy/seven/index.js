function flatDeep(arr, d = 1) {
  if (d > 0) {
    return arr.reduce((res, val) => {
      if (Array.isArray(val)) {
        res.contact(flatDeep(val, d - 1))
      }
    }, [])
  }
}