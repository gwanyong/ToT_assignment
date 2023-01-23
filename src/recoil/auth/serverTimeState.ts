import { atom } from 'recoil';

export const serverTimeState = atom({
  key: 'serverTimeState',
  default: {
    startedAt: '',
    expiredAt: '',
  },
});
