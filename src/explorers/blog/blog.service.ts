import { Injectable } from '@nestjs/common';
import {
  parseAge,
  parseCountry,
  parseLocalization,
  parsePseudo,
} from 'explorers/utils/utils';
import { JSDOM } from 'jsdom';
import { User } from 'users/user.entity';
@Injectable()
export class BlogService {
  async parse(html: string) {
    const DOM = new JSDOM(html);

    const document = DOM.window.document;

    let gender = null;
    let age = null;
    let postalCode = null;
    let localization = null;
    let country = null;

    const profileLink = document.querySelector(
      '#blogprofil .infos a',
    ) as HTMLAnchorElement;

    const pseudo = parsePseudo(profileLink.innerHTML);
    if (profileLink.classList.contains('girl')) {
      gender = 'f';
    }
    if (profileLink.classList.contains('boy')) {
      gender = 'm';
    }
    const detailsLink = document.querySelector(
      '#blogprofil .infos .details',
    ) as HTMLSpanElement;

    if (detailsLink.innerHTML.includes('<br>')) {
      const [first, second, third] = detailsLink.innerHTML.split('<br>');
      age = parseAge(first);
      ({ localization, postalCode } = parseLocalization(second));
      country = parseCountry(third);
    }

    return new User({
      user: pseudo,
      gender,
      age,
      postalCode,
      localization,
      country,
    });
  }
}
