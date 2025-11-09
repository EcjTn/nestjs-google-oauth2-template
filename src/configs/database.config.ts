import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const typeOrmAsyncOption: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: async(configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
    })
}