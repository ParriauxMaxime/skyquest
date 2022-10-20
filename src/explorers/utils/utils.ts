import { Iconv } from 'iconv';

const iconv = new Iconv('UTF-8', 'ASCII//TRANSLIT');
const defaultShit = 'shit';

const convert = (str: string) => {
  try {
    return iconv.convert(str).toString();
  } catch {
    return str;
  }
};

export function parseAge(skyrockBullshit: string) {
  const test = Number(skyrockBullshit.replace(/(\d+).*/, '$1'));
  if (isNaN(test)) return null;
  return test;
}

export function parseLocalization(skyrockBullshit: string) {
  let localization = defaultShit;

  if (/.*\(\d+\).*/.test(skyrockBullshit)) {
    try {
      localization = convert(
        skyrockBullshit.slice(0, skyrockBullshit.lastIndexOf(' ')),
      ).toLowerCase();
    } catch {}

    return {
      localization,
      postalCode: skyrockBullshit
        .slice(skyrockBullshit.lastIndexOf(' '))
        .replace(/.*\((\d+)\).*/, '$1')
        .slice(0, 10)
        .toLowerCase(),
    };
  }

  return {
    localization: convert(skyrockBullshit).toLowerCase(),
    postalCode: null,
  };
}

export function parseCountry(skyrockBullshit: string) {
  return convert(skyrockBullshit).toLocaleLowerCase().trim();
}

export function parsePseudo(skyrockBullshit: string) {
  return skyrockBullshit.toLocaleLowerCase().trim();
}
