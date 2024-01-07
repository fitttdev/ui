import { Module } from '@nestjs/common';
import { VideoController } from './transcoder.controller';
import { VideoService } from './transcoder.service';
import { BullModule } from '@nestjs/bullmq';
import { TRASCODE_QUEUE } from './constant';
import { TranscodeConsumer } from './transcoder.consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
  controllers: [VideoController],
  providers: [VideoService, TranscodeConsumer],
})
export class TranscoderModule { }
