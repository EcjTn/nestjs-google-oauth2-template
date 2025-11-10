import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { PassportStrategy } from "@nestjs/passport"
import { ConfigService } from '@nestjs/config'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { IGoogleProfile } from 'src/common/interfaces/google-user.interface'
import { UsersService } from 'src/users/users.service'
import { IUserPayload } from '../interfaces/user-payload.interface'

@Injectable()
export class GoogleOAuth2Strategy extends PassportStrategy(GoogleStrategy) {

    constructor(private readonly configService: ConfigService, private readonly usersService: UsersService) {
        super({
            clientID: configService.getOrThrow('GOOGLE_CLIENT_ID'),
            clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.getOrThrow('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile']
        })
    }


    public async validate(accessToken: string, refreshToken: string, profile: IGoogleProfile) {

        try{
            const googleId = profile.id
            const username = profile.displayName
            const email = profile.emails[0].value
            const profilePicture = profile.photos[0].value
    
    
            const payload = {googleId, username, email, profilePicture}
    
            let userRecord = await this.usersService.findByGoogleId(profile.id)
    
            if(!userRecord) {
                userRecord = await this.usersService.addGoogleUser(username, profilePicture, googleId, email)
            }
            else{
                //Syncing existing user info
                userRecord.username = username
                userRecord.email = email
                userRecord.profilePicture = profilePicture
                await this.usersService.save(userRecord)
            }

            const userPayload: IUserPayload = {
                id: userRecord.id,
                googleId: userRecord.googleId,
                username: userRecord.username,
                email: userRecord.email,
                profilePicture: userRecord.profilePicture
            }

            //Return here becomes req.user
            return userPayload

        }catch(e){
            console.log("Google auth failed", e)
            throw new InternalServerErrorException()
        }

    }

}