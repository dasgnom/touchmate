/* eslint-disable */
var currency = function(value, currency, currency_before, decimal_separator) {
  let formated = '';
  let val = Math.abs(value);
  let negative = '';

  if (!val) {
    val = `000`;
  } else if (val.toString().length === 1) {
    val = `00${val}`;
  } else if (val.toString().length === 2) {
    val = `0${val}`;
  }
  formated = val.toString().slice(0, -2);
  formated += decimal_separator;
  formated += val.toString().substr(-2, 2);

  if (value < 0) {
    negative = '-';
  }

  formated = `${negative}${formated}`;

  if (currency_before) {
    return `${currency}${formated}`;
  }
  return `${formated} ${currency}`;
};

var stripComma = function(value) {
  if (value === '') {
    return null;
  } else if (typeof value === 'string') {
    return value.replace(",", "").replace(".", "");
  } else {
    return value;
  }
}

var decimalValue = function(value, decimalSeperator, places=2) {
  let formated = '';
  let val = Math.abs(value);
  let negative = '';

  if (places === 2) {
    if (val === '') {
      return null;
    } else if (val.toString().length === 1) {
      val = `00${val}`;
    } else if (val.toString().length === 2) {
      val = `0${val}`;
    }
    formated = val.toString().slice(0, -2);
    formated += decimalSeperator;
    formated += val.toString().substr(-2, 2);
  } else {
    if (val === '') {
      return null;
    } else if (val.toString().length === 1) {
      val = `0${val}`;
    }
    formated = val.toString().slice(0, -1);
    formated += decimalSeperator;
    formated += val.toString().substr(-1, 1);
  }

  if (value < 0) {
    negative = '-';
  }

  formated = `${negative}${formated}`;
  return formated;
}

/* eslint-enable */

exports.currency = currency;
exports.stripComma = stripComma;
exports.decimalValue = decimalValue;
