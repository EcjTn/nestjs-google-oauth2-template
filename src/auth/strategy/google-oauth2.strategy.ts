import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { PassportStrategy } from "@nestjs/passport"
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { IGoogleProfile } from 'src/common/interfaces/google-user.interface'

@Injectable()
export class GoogleOAuth2Strategy extends PassportStrategy(GoogleStrategy) {

    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.getOrThrow('GOOGLE_CLIENT_ID'),
            clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.getOrThrow('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile']
        })
    }


    public async validate(accessToken: string, refreshToken: string, profile: IGoogleProfile) {
        const googleUserId = profile.id
    }

}