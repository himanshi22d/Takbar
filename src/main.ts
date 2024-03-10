
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import * as path from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const publicPath = './pages/index.js'; 
    app.useStaticAssets(publicPath); // Serve static assets from the specified directory
    await app.listen(3000);
}
bootstrap();

