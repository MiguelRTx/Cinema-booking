import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    try {
      const adminExists = await this.userModel.findOne({
        where: { role: UserRole.ADMIN },
      });
      if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await this.userModel.create({
          email: 'admin@cine.com',
          password: hashedPassword,
          role: UserRole.ADMIN,
        } as any);
        console.log(
          'Usuario Administrador por defecto creado: admin@cine.com | Pass: admin123',
        );
      }
    } catch {
      void 0;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...createUserDto } as any);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findByPk(id);
  }
}
