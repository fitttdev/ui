import { Processor, WorkerHost } from '@nestjs/bullmq';
import { TRASCODE_QUEUE } from "./constant";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

@Processor(TRASCODE_QUEUE)
export class TranscodeConsumer extends WorkerHost {
  private readonly logger = new Logger(TranscodeConsumer.name);

  async process(job: Job<unknown>) {
    this.logger.log(`Transcoding Job: ${job.id}`);
    this.logger.log(`DATA: ${JSON.stringify(job.data)}`);
    // emulating transcoding or a heavy operation
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000));
    this.logger.log(`Transcoding finished for job ${job.id}`);
  }
}
