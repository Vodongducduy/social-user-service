import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from '../constant';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh"){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: any) {
        const refreshToken = req.get("Authorization").replace("Bearer", "").trim();
        return {...payload,refreshToken};
    }
}