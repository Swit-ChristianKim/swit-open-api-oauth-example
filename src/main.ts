import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NgrokSessionBuilder } from '@ngrok/ngrok';
import { Logger } from '@nestjs/common';

// Please provide your ngrok authtoken here.
const ngRokToken = '';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  // Setup ngrok
  const session = await new NgrokSessionBuilder()
    .authtoken(ngRokToken)
    .connect();
  const tunnel = await session.httpEndpoint().listen();
  new Logger('main').log(`Ingress established at ${tunnel.url()}`);
  tunnel.forward(`localhost:${port}`);
}
bootstrap();
