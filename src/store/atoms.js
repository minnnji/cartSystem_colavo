import { atom } from 'recoil';

export const cartItemIdState = atom({
  key: 'selectedItemIds',
  default: {}
});

export const cartItemState = atom({
  key: 'selectedItems',
  default: {}
});

export const cartDiscountIdState = atom({
  key: 'selectedDiscountIds',
  default: {}
});

export const cartDiscountState = atom({
  key: 'selectedDiscounts',
  default: {}
});

export const currentModal = atom({
  key: 'modal',
  default: {
    isDisplay: false,
    title: '',
    children: ''
  }
});
