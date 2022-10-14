import { formatMoney } from '@lincy-js/utils/number';
import dayjs from '@lincy-js/utils/dayjs';

export default {
  money (num: number, decimal = 2) {
    return formatMoney(num, decimal, '¥');
  },
  dateToMinute (d: number|string) {
    return dayjs(d).format('YYYY-MM-DD HH:mm');
  }
};
