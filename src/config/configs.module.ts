import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./configuation"

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [config]
    })]
})
export class ConfigsModule{
    
}