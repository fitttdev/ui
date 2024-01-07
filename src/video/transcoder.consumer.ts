import { Processor, WorkerHost } from '@nestjs/bullmq';
import { TRASCODE_QUEUE } from './constant';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor(TRASCODE_QUEUE)
export class TranscodeConsumer extends WorkerHost {
  private readonly logger = new Logger(TranscodeConsumer.name);
  private readonly billion = 1000000000;
  private readonly printInterval = 100000000;

  async process(job: Job<unknown>) {
    this.logger.log(`Transcoding Job: ${job.id}`);
    this.logger.log(`DATA: ${JSON.stringify(job.data)}`);
    await this.emulateTranscoding();
    this.logger.log(`Transcoding finished for job ${job.id}`);
  }

  private async emulateTranscoding() {
    for (let i = 0; i < this.billion; i++) {
      if (i % this.printInterval === 0) {
        console.log(i);
      }
    }
  }
}
