import { atom } from 'recoil';

export const createAtom = (key, defaultValue) => {
  return atom({
    key,
    default: defaultValue,
  });
};

export const cm98010000CodeNm = createAtom('cm98010000CodeNm', '');
export const cm98010000DataGrid = createAtom('cm98010000DataGrid', []);
export const cm98010000RowCount = createAtom('cm98010000RowCount', 0);