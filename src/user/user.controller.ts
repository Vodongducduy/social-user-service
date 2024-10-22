import { Body, Controller, Get, Logger, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";

@Controller("user")
@UseGuards(AccessTokenGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}
    private readonly logger = new Logger(UserController.name);

    @Get()
    findAll() {
        // this.logger.error(`Retrieve All User`);
        return this.userService.findAllUser();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.viewUser(+id);
    }

}