import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { AcessTokenStrategy } from "./strategies/acessToken.strategy";
import { RefreshTokenStrategy } from "./strategies/refreshToken.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";

@Module({
    imports:[
        JwtModule.register({}),
        UserModule
    ],
    controllers:[AuthController],
    providers: [
        AuthService,AuthGuard, AcessTokenStrategy, RefreshTokenStrategy
    ],
})
export class AuthModule {}