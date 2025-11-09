import { Injectable } from '@nestjs/common';
import { User } from './entity/users.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    public findByGoogleId(id: number) {
        return this.userRepo.findOne({where: {googleId: id}})
    }

}
