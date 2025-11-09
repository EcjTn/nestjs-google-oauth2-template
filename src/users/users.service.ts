import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './entity/users.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    public findByGoogleId(id: string) {
        return this.userRepo.findOne({where: {googleId: id}})
    }

    public async addGoogleUser(username: string, profilePicture: string, googleId: string, email: string){
        try{
            const newGoogleUser = this.userRepo.create({googleId, username, profilePicture, email})
            await this.userRepo.save(newGoogleUser)
        }catch(e){
            console.log(e)
            throw new InternalServerErrorException()
        }
    }

}
