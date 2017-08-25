export class FilterOnPropertyValueConverter {
  toView(array, property, exp) {
    if (array === undefined || array === null ||property === undefined || exp === undefined)
      return array;
    return array.filter(item => item[property].indexOf(exp.toLowerCase()) > -1)
  }
}

