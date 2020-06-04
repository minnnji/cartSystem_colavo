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

export const requestItemByIdList = async (idList: string[]) => {
  try {
    const result = {};
    const { data } = await axios.get(
      'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData'
    );

    for (let i = 0; i < idList.length; i++) {
      const id = idList[i];
      result[id] = data.items[id];
    }

    return result;
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

export const requestDiscountByIdList = async (idList: string[]) => {
  try {
    const result = {};
    const { data } = await axios.get(
      'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData'
    );

    for (let i = 0; i < idList.length; i++) {
      const id = idList[i];
      result[id] = data.discounts[id];
    }

    return result;
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
