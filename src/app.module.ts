import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TRASCODE_QUEUE, TranscoderModule } from './video';

import { AppController } from './app.controller';

@Module({
  imports: [
    TranscoderModule,
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT')
        }
      }),
      inject: [ConfigService]
    }),
    BullModule.registerQueue({
      name: TRASCODE_QUEUE
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
