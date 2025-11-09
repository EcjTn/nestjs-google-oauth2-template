import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { PassportStrategy } from "@nestjs/passport"
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { IGoogleProfile } from 'src/common/interfaces/google-user.interface'
import { VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service'

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


    public async validate(accessToken: string, refreshToken: string, profile: IGoogleProfile, done: VerifyCallback) {
        const googleId = profile.id
        const username = profile.displayName
        const email = profile.emails[0].value
        const profilePicture = profile.photos[0].value

        const userRecord = await this.usersService.findByGoogleId(profile.id)
        if(!userRecord) {
            await this.usersService.addGoogleUser(username, profilePicture, googleId, email)
        }

        const payload = {
            googleId,
            username,
            email,
            profilePicture
        }

        done(null, payload)

    }

}