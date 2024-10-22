import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post("signin")
    async signIn(@Body() payload: CreateUserDto) {
        return this.authService.signIn(payload);
    }
    
    @Post("signup")
    signUp(@Body() payload: CreateUserDto) {
        return this.authService.signUp(payload);
    }

    @UseGuards(AccessTokenGuard)
    @Get("logout")
    logout(@Req() req: Request) {
        this.authService.logOut(req.user["sub"]);
    }

    @UseGuards(RefreshTokenGuard)
    @Get("refresh")
    refreshTokens(@Req() request: Request) {
        const userId = request.user["sub"];
        const refreshToken = request.user["refreshToken"];
        return this.authService.refreshTokens(userId, refreshToken);
    }
}