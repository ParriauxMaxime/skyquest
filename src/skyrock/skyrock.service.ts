import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { mkdirSync } from 'fs';
import { readdirSync } from 'fs';
import { readdir, readFile, writeFile } from 'fs/promises';
import * as path from 'path';
import * as process from 'process';
import { lastValueFrom } from 'rxjs';
import { Iconv } from 'iconv';
import { FansService } from 'explorers/fans/fans.service';

const iconv = new Iconv('ISO-8859-15', 'UTF-8');

@Injectable()
export class SkyrockService {
  private cacheSlug = 'cache';
  private blogCacheSlug = 'blog';
  private fansCacheSlug = 'fans';
  private blogCacheFolder = path.resolve(
    process.cwd(),
    this.cacheSlug,
    this.blogCacheSlug,
  );
  private fansCacheFolder = path.resolve(
    process.cwd(),
    this.cacheSlug,
    this.fansCacheSlug,
  );

  constructor(
    private httpService: HttpService,
    private fansService: FansService,
  ) {
    const directories = readdirSync(
      path.resolve(process.cwd(), this.cacheSlug),
    );

    if (!directories.includes(this.blogCacheSlug)) {
      mkdirSync(this.blogCacheFolder);
    }

    if (!directories.includes(this.fansCacheSlug)) {
      mkdirSync(this.fansCacheFolder);
    }
  }

  private async fetchBlog(pseudo: string) {
    console.log('Fetching', pseudo);

    const page = await lastValueFrom(
      this.httpService.get(`https://${pseudo}.skyrock.com/`, {}),
    );

    return page.data;
  }

  private async fetchFans(
    pseudo: string,
    href = '/fans.html',
    acc?: NodeList[],
  ) {
    console.log('Fetching fans', pseudo, href);
    const selectors = '#blogcontent ul.liste-amis';
    const page = iconv
      .convert(
        (
          await lastValueFrom(
            this.httpService.get(`https://${pseudo}.skyrock.com${href}`, {
              responseEncoding: 'binary',
              responseType: 'arraybuffer',
            }),
          )
        ).data,
      )
      .toString();

    const next = this.fansService.parseNext(page, !acc, selectors);
    if (next) {
      return await this.fetchFans(pseudo, next.url, [
        ...(acc || []),
        next.document,
      ] as any);
    }

    return acc
      ? this.fansService.pushTo(
          acc[0] as any as Document,
          acc.slice(1),
          selectors,
        )
      : page;
  }

  private async getBlogFromCache(pseudo: string) {
    if ((await readdir(this.blogCacheFolder)).includes(pseudo)) {
      return readFile(path.resolve(this.blogCacheFolder, pseudo));
    }

    const page = await this.fetchBlog(pseudo);
    await writeFile(path.resolve(this.blogCacheFolder, pseudo), page, 'utf-8');
    return page;
  }

  private async getFansFromCache(pseudo: string) {
    if ((await readdir(this.fansCacheFolder)).includes(pseudo)) {
      return readFile(path.resolve(this.fansCacheFolder, pseudo), 'utf-8');
    }

    const page = await this.fetchFans(pseudo);
    await writeFile(path.resolve(this.fansCacheFolder, pseudo), page, 'utf-8');
    return page;
  }

  async getBlog(pseudo: string) {
    const page = await this.getBlogFromCache(pseudo);
    return page;
  }

  async getFans(pseudo: string) {
    const page = await this.getFansFromCache(pseudo);
    return page;
  }
}
