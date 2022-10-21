import { Injectable } from '@nestjs/common';
import {
  parseAge,
  parseCountry,
  parseLocalization,
  parsePseudo,
} from 'explorers/utils/utils';
import { Friend } from 'friends/friend.entity';
import { JSDOM } from 'jsdom';
import { User } from 'users/user.entity';

@Injectable()
export class FansService {
  parseNext(html: string, first: boolean, selector: string) {
    const DOM = new JSDOM(html);

    const document = DOM.window.document;
    const next = document.querySelector('ul.pagination li.next a');
    const current = document.querySelector(
      'ul.pagination li.current a',
    ) as HTMLAnchorElement;

    /** Limit those crazy girls to 800 fans */
    {
      if (current && Number(current.innerHTML) > 20) return;
    }

    if (next) {
      return {
        url: (next as HTMLAnchorElement).href,
        document: first
          ? document
          : document.querySelectorAll(selector + '> li'),
      };
    }
  }

  pushTo(base: Document, next: NodeList[], selector: string) {
    next.forEach((n, i) => {
      console.info('push', i);
      base.querySelector(selector).append(...n);
    });

    return base.documentElement.outerHTML;
  }

  parse(html: string) {
    const DOM = new JSDOM(html);

    const document = DOM.window.document;

    let gender = null;
    let age = null;
    let postalCode = null;
    let localization = null;
    let country = null;

    const profileLink = (document.querySelector('#blogprofil .infos a') ||
      document.querySelector('h1.blogpseudo a') ||
      document.querySelector('#blogwhois p.infos a')) as HTMLAnchorElement;

    if (!profileLink) {
      return [];
    }

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

    if (detailsLink && detailsLink.innerHTML.includes('<br>')) {
      const [first, second, third] = detailsLink.innerHTML.split('<br>');
      age = parseAge(first);
      ({ localization, postalCode } = parseLocalization(second));
      country = third ? parseCountry(third) : null;
    }

    const friendsList = [
      ...document
        .querySelectorAll(
          '#blogcontent ul.liste-amis .info-thumbnail span:nth-child(2)',
        )
        .values(),
    ];
    const friends = friendsList.map((friend) => {
      const elem = [...friend.parentElement.childNodes.values()];
      let age = null;
      let localization = null;
      let postalCode = null;
      let country = null;
      let gender = null;
      const pseudo = parsePseudo(friend.innerHTML);

      if (friend.classList.contains('girl')) {
        gender = 'f';
      }
      if (friend.classList.contains('boy')) {
        gender = 'm';
      }

      if (elem.length > 2) {
        age = parseAge(elem[3].textContent);
        country = elem.length > 8 ? parseCountry(elem[8].textContent) : null;
        ({ localization, postalCode } =
          elem.length > 5
            ? parseLocalization(elem[5].textContent)
            : { localization: null, postalCode: null });
      }

      const user = new User({
        age,
        localization,
        postalCode,
        country,
        user: pseudo,
        gender,
      });

      return user;
    });
    return friends.map(
      (friend) =>
        new Friend({
          user: pseudo,
          _user: new User({
            user: pseudo,
            age,
            gender,
            country,
            postalCode,
            localization,
          }),
          friend: friend.user,
          _friend: friend,
        }),
    );
  }
}
