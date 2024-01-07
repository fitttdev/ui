import { Controller, Get, Post } from '@nestjs/common';

// In a typical NestJS application, the AppController is usually
// responsible for handling global routes that aren't tied to a 
// specific feature or module. 
// 1. Health checks,
// 2. Application metadata
// 3. For static pages.
@Controller()
export class AppController {
}
