import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { TicketsModule } from './tickets/tickets.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
