import { atom } from 'recoil';

export const pageDataState = atom({
  key: 'pageDataState',
  default: {
    title: '',
    contents: '',
  },
});