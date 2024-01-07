import { Controller, Post } from '@nestjs/common';
import { VideoService } from './transcoder.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  @Post('transcode')
  async transcode() {
    return this.videoService.transcode();
  }
}
