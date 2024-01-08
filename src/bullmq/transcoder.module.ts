import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { VideoController } from './transcoder.controller';
import { VideoService } from './transcoder.service';
import { TranscodeConsumer } from './transcoder.consumer';
import { TRASCODE_QUEUE } from './constant';

@Module({
 imports: [
   BullModule.registerQueue({
     name: TRASCODE_QUEUE
   }),
 ],
 controllers: [VideoController],
 providers: [VideoService, TranscodeConsumer],
})
export class TranscoderModule { }
