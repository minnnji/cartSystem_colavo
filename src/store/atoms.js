import { atom } from 'recoil';

export const cartItemIdState = atom({
  key: 'selectedItemIds',
  default: {}
});

export const cartItemState = atom({
  key: 'selectedItems',
  default: {}
});

export const cartDiscountState = atom({
  key: 'selectedDiscount',
  default: []
});

export const currentModal = atom({
  key: 'modal',
  default: {
    isDisplay: false,
    title: '',
    children: ''
  }
});
