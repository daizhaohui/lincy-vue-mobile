import District from '@/config/district';

const district: any = District;

export default class DictionaryUtil {
  static getDistrictLev1 () {
    let e;
    const t = [];
    for (e = 1; e < 100; e++) {
      let i = '0000';
      i = e < 10 ? '0' + e + i : e + i;
      const n = district[i];
      typeof n !== 'undefined' && t.push({
        id: i,
        text: n[0]
      });
    }
    return t;
  }

  static getDistrictLev2 (t) {
    if (t === '') { return []; }
    let i;
    const e = [];
    for (i = 1; i < 100; i++) {
      let n = t.substr(0, 2);
      n += i < 10 ? '0' + i + '00' : i + '00';
      const r = district[n];
      typeof r !== 'undefined' && e.push({
        id: n,
        text: r[0]
      });
    }
    return e;
  }

  static getDistrictLev3 (t: string) {
    if (t === '') { return []; }
    let i;
    const e = [];
    for (i = 1; i < 100; i++) {
      let n = t.substr(0, 4);
      n += i < 10 ? '0' + i : i;
      const r = district[n];
      typeof r !== 'undefined' && e.push({
        id: n,
        text: r[0]
      });
    }
    return e;
  }
}
