import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';

@Injectable()
export class TokenRepository {
    constructor(
        @InjectModel(Token)
        private tokenModel: typeof Token,
    ) {}

    async add(token) {
        console.log(token);
        await Token.create({
            id: token.id,
            userId: token.userId,
            refreshToken: token.refresh_token
        })
    }

    async deleteByUserId(userId){
        return await Token.destroy({
            where: {
                userId: userId,
            }
        })
    }

    async findByUserId(userId){
        return await Token.findOne({
            where: {
                userId: userId
            }
        })
    }
}