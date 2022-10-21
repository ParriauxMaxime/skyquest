# Skyquest

### **A Skyblog oddity**

> _"In a non-indexed website, no one can hear you crawl"_

<br />
  
## Description

**Skyrock.com is a social networking site based in France that offers a free space on the web to allow its users to create blogs, add profiles, and exchange messages with other registered members**

Between 2006 and 2009, almost every french guy/girl within the teens range used to have a blog online.  
Some are okay, some are creepy, but most of them are definitely cringe.

**Can you feel it ?** The dense and awful perfume of cryptic messages between teenager which is not without remembering you the early Facebook odyssey.

<br />

## Goal

My significant other had one of them. She challenged me to find it.

<p align="center">
  <img src="https://static.wikia.nocookie.net/star-wars-memes/images/2/24/Youunderestimatemypower.jpg/revision/latest?cb=20200430021236" width="200" alt="Powaa" />
</p>

<br />

## Approach

After a few month of unfructous manual labor, I came to multiple conclusions and [research](https://docs.google.com/spreadsheets/d/1QV-HXPgcso8yHT2lvmGLLtA8DfsN4fuZHcc0WAPEkNU/edit?usp=sharing)

1. Google refused to indexes Skyrock.com (actually, some of it is indexed, but less than X%)
2. Most skyrock userbase was young (around 16 yo), Internet was deep and unknown at that time, so most content would be gibberish.
3. Username are composed of a maximum of 24 char which will be used in the URL, which restrict the charset to only 37 chars [_abcdefghijklmnopqrstuvwxyz0123456789-_] (lowercase only since it's would be digest in the URL).  
   EG: if my username is **ParriauxMaxime**, my skyblog should exist at https://parriauxmaxime.skyrock.com.

4. Being a social network before Facebook mass adoption in France (~ 2009, take it or leave it), Skyrock allowed profiles to connect between each others : **Fan/Source**  
   Fan and source usually being 1:1, let's focus on Fans only.  
   Those are located at https://parriauxmaxime.skyrock.com/fans.html, https://parriauxmaxime.skyrock.com/fans2.html, ...

5. Most of the userbase (at least 80%) had filled some essentials informations: age, localization, postalCode, country, etc.

Basically, bruteforcing every nickname possibility and scrapping data on-the-go would take around **4.37 \* 10³⁴** seconds, assuming 1000 fetch/second.  
Going with the [_precedent research_](https://docs.google.com/spreadsheets/d/1QV-HXPgcso8yHT2lvmGLLtA8DfsN4fuZHcc0WAPEkNU/edit?usp=sharing), doing the same with a 68% confidence in the nickname length (6 - 15) would still take an eternity (~10¹¹ seconds)  
(Been there, done that, **<ins>useless</ins>**)

<br />

Remember [Six degrees of separation](https://en.wikipedia.org/wiki/Six_degrees_of_separation) ?  
In a nutshell, you're connected to anybody on this planet in less than 6 hops

**Sanity approach would be to map through fans with a "close" localization to your target**

<br />

## Get started

0. Install the dependencies

```
  yarn
  # or
  npm i
```

1. You gonna need a database (postgres with postgis activated, and i also used metabase to have a quick glance to the awful amount of data there)

```
  docker-compose up -d
```

2. Populate your database with what I got from 48hours of crawling (you need [psql](https://www.postgresql.org/docs/current/app-psql.html) installed locally)

```
  yarn psql_init
  # or
  npm run psql_init
```

3. (optional), If you plan to continue scrapping this, you can uncache some predata

```
  yarn uncache
  # or
  npm run uncache
```

4. Start the application

```
  yarn start:dev
```

5. REPL time. The profile command will fetch through 2 levels of recursion within the fans of **"nickname"**

```
  profile("nickname")
```

<br />

## FAQ

- **Q:** Did you succeed ?  
  **A:** Yes

<br />

- **Q:** What did it cost ?  
  **A:** Everything

<br />

- **Q:** My target did not fill his infos at that time, what should I do ?  
  **A:** Some of his/her friends had those infos filled, you should try to iterate on "close" (geographic era/age) fans

<br />

- **Q:** What it I cannot find my target by age or localization ?  
  **A:** You could try to fetch last 5 posts per blogs along with the first ~100 comments. From there, you will need to implement feature detections (surname/city name/school name/etc).
  If you end up navigating huge pile of crap data, you can try to use [Zipf law](https://en.wikipedia.org/wiki/Zipf%27s_law) to trim the garbage.

<br />
<br />
<br />
<br />

<br />

## Build with Nest

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
