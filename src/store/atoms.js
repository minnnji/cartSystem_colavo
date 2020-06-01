import { atom } from 'recoil';

export const cartItemState = atom({
  key: 'selectedItem',
  default: []
});

export const cartDiscountState = atom({
  key: 'selectedDiscount',
  default: []
});
