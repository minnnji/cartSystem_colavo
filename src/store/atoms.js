import { atom } from 'recoil';

export const cartItemState = atom({
  key: 'selectedItem',
  default: []
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
