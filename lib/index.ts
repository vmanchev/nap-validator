export function isValidEIK(eik: string): boolean {

  let matches;

  if (!(matches = eik.match(/^((\d{9})(\d{4})?)$/)))
    return false;

  //1*а1+2*а2+3*а3+4*а4+5*а5+6*а6+7*а7+8*а8;
  let a = matches[2].split('').map(i => parseInt(i, 10));

  let a9 = a[0] * 1 + a[1] * 2 + a[2] * 3 + a[3] * 4 + a[4] * 5 + a[5] * 6 + a[6] * 7 + a[7] * 8;
  a9 = a9 % 11;

  if (a9 == 10) {
    //3*а1+4*а2+5*а3+6*а4+7*а5+8*а6+9*а7+10*а8
    a9 = a[0] * 3 + a[1] * 4 + a[2] * 5 + a[3] * 6 + a[4] * 7 + a[5] * 8 + a[6] * 9 + a[7] * 10;
    a9 = a9 % 11;
  }

  a9 = a9 == 10 ? 0 : a9;

  if (a9 != a[8])
    return false;
  if (!matches[3])
    return true;

  //2*а9 + 7*а10 + 3*а11 +5*а12
  a = matches[3].split('').map(i => parseInt(i, 10));

  let a13 = a9 * 2 + a[0] * 7 + a[1] * 3 + a[2] * 5;
  a13 = a13 % 11;

  //4*а9+9*а10+5*а11+7*а12
  if (a13 == 10) {
    a13 = a9 * 4 + a[0] * 9 + a[1] * 5 + a[2] * 7;
    a13 = a13 % 11;
  }

  a13 = a13 == 10 ? 0 : a13;

  return (a13 == a[3]);
}

export function isValidVAT(vat: string): boolean {

  const parts = vat.match(/^(BG)(\d{9,})/);

  return parts !== null && isValidEIK(parts[2]);
}