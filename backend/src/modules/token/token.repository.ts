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
        await Token.create({
            id: token.id,
            userId: token.user_id,
            accessToken: token.accessToken,
            refreshToken: token.refresh
        })
    }

    async deleteById(id){
        return await Token.destroy({
            where: {
                id: id,
            }
        })
    }
}