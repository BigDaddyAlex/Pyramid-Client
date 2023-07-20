export const parseData = (data) => {
    return  Object
    .keys(data)
    .map((key) => {
      return key + ':' + data[key]
    })
    .join('\n')
  }