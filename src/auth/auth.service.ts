import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserPayload } from './interfaces/user-payload.interface';
import { IJwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    public async generateAccessToken(user: IUserPayload){
        try{
            const jwyPayload: IJwtPayload = {sub: user.id, googleId: user.googleId}
            const accessToken = await this.jwtService.signAsync(jwyPayload)

            return {accessToken, user}

        }catch(e) {
            console.log("GenerateToken Error:", e)
            throw new InternalServerErrorException()
        }
    }

}
