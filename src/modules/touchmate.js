const currency = function(value, currency, currency_before, decimal_separator) {
  let formated = '';
  let val = value;

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

  if (currency_before) {
    return `${currency}${formated}`;
  }

  return `${formated} ${currency}`;
};

exports.currency = currency;
