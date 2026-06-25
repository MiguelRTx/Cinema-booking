import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './models/room.model';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private roomModel: typeof Room) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomModel.create({ ...createRoomDto } as any);
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.findAll();
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomModel.findByPk(id);
    if (!room) throw new NotFoundException('Sala no encontrada');
    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);
    return room.update(updateRoomDto);
  }

  async updateLayout(id: string, layout: Record<string, string>): Promise<Room> {
    const room = await this.findOne(id);
    return room.update({ layout });
  }
}
