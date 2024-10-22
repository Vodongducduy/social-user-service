import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { mapDtoToEntity } from "src/utils/mapDtoToEntity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly config:ConfigService
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        //check email
        let user = await this.userRepository.findOneBy({email: createUserDto.email});
        if (user) {
            throw new BadRequestException("Email is exists");
        }
        user = await this.userRepository.findOneBy({username: createUserDto.username});
        if (user) {
            throw new BadRequestException("username is exists");
        }
        return this.userRepository.save(mapDtoToEntity(createUserDto, UserEntity));
    }

    findAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    updateUser(id: number, updateUserDto: CreateUserDto): Promise<UserEntity> {
        const user: UserEntity = mapDtoToEntity(updateUserDto, UserEntity);
        user.id = id;
        return this.userRepository.save(user);
    }

    async updateRefreshToken(userId: number, refreshToken: string) {
        let user = await this.userRepository.findOneBy({id: userId});
        if (!user) {
            throw new UnauthorizedException();
        }
        user.refreshToken = refreshToken;
        this.userRepository.save(user);
    }

    removeUser(id: number): Promise<{ affected?: number }> {
        return this.userRepository.delete(id);
    }

    viewUser(id: number): Promise<UserEntity> {
        return this.userRepository.findOneBy({id});
    }

    async findByUsername(username: string): Promise<UserEntity> {
        const user =  await this.userRepository.findOneBy({username: username});
        if (!user) {
            throw new BadRequestException("User does not exist");
        } 
        return user;
    }

    async findUserById(userId: number): Promise<UserEntity> {
        return this.userRepository.findOneBy({id: userId});
    }

}