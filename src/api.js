import axios from 'axios';

export const requestItem = async () => {
  try {
    const { data } = await axios.get(
      'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData'
    );

    return data.items;
  } catch (err) {
    alert(err);
  }
};

export const requestDiscounts = async () => {
  try {
    const { data } = await axios.get(
      'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData'
    );

    return data.discounts;
  } catch (err) {
    alert(err);
  }
};

export const requestCurrencyCode = async () => {
  try {
    const { data } = await axios.get(
      'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData'
    );
    return data.currency_code;
  } catch (err) {
    alert(err);
  }
};
