import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkDb() {
    try {
      await this.prismaService.$connect();
      return { status: 'UP' };
    } catch (error) {
      return { status: 'DOWN', details: { error } };
    } finally {
      await this.prismaService.$disconnect();
    }
  }
}
