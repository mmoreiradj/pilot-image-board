import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async check() {
    return { status: 'OK' };
  }

  @Get('db')
  async checkDb() {
    return this.healthService.checkDb();
  }
}
