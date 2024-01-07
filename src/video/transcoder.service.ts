
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { TRASCODE_QUEUE } from './constant';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class VideoService {
  constructor(@InjectQueue(TRASCODE_QUEUE)
  private readonly transcodeQueue: Queue
  ) { }

  async transcode() {
    await this.transcodeQueue.add('transcode', {
      fileName: "file.mp3"
    });
  }
}
