import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TicketsService {

  constructor( private readonly db: PrismaService){

  }

  create(createTicketDto: CreateTicketDto) {
    return this.db.speedingTicket.create({
      data: createTicketDto
    });
  }

  findAll() {
    return this.db.speedingTicket.findMany();
  }

  findOne(id: number) {
    return this.db.speedingTicket.findUniqueOrThrow({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.db.speedingTicket.update({
      data: updateTicketDto,
      where: {id}
    });
  }

  remove(id: number) {
    return this.db.speedingTicket.delete({
      where: {
        id: id
      }
    });;
  }

  findAllActive(active?: boolean){
    return this.db.speedingTicket.findMany({
      where: {active}
    })      
    }
}
