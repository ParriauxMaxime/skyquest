import { repl } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { AppService } from 'app.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const r = await repl(AppModule);

  const service = app.get(AppService);

  r.context.profile = async (pseudo: string) => {
    await service.getProfileRecurse(pseudo, 2);
    console.info('done', pseudo);
  };
}
bootstrap();
