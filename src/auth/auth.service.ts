import { v4 as uuidv4 } from 'uuid';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as argon2 from "argon2";
import { AuthDto } from './dto/auth.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ){}

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        createUserDto.password = await this.hashData(createUserDto.password);
        this.userService.createUser(createUserDto);
    }

    async signIn(authDto: AuthDto): Promise<any> {
        // Get User by username
        const user = await this.userService.findByUsername(authDto.username);
        // compair password hash
        const paswwordMatches = await argon2.verify(user.password, authDto.password);
        if (!paswwordMatches) {
            throw new BadRequestException("Password is incorrect");
        }
        // Get refresh Token and acess token
        const tokens = await this.getTokens(user.id, user.username);
        // Update refresh Token
        await this.updateRefreshToken(user.id,tokens.refreshToken);
        return tokens;
    }

    async logOut(userId: number) {
        return this.userService.updateRefreshToken(userId, null);
    }

    private hashData(data: string) {
        return argon2.hash(data);
    }

    private async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        // update refreshToken for user
        await this.userService.updateRefreshToken(userId, hashedRefreshToken);
    }
    

    private async getTokens(userId: number, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub:userId,
                username,
            },
            {
                secret: jwtConstants.secret,
                expiresIn: "15m",
            }),
            this.jwtService.signAsync({
                sub: userId,
                username,
            },
            {
                secret: jwtConstants.secret,
                expiresIn: "7d",
            })
        ]);
        return {
            accessToken,
            refreshToken,
        }
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.userService.findUserById(userId);

        if(!user ||!user.refreshToken) {
            throw new ForbiddenException("Access Denied");
        }

        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);

        if (!refreshTokenMatches) {
            throw new ForbiddenException("Access Denied");
        }

        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.id,tokens.refreshToken);
        return tokens;
    }

    
}