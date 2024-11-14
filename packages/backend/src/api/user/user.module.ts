import { Module } from '@nestjs/common';
import {
	UserGetController,
	UsersGetController,
} from './infrastructure/controller/user.get.controller';
import { UserPostController } from './infrastructure/controller/user.post.controller';
import { UserPutController } from './infrastructure/controller/user.put.controller';
import { UserController } from './infrastructure/user.db.controller';

@Module({
	controllers: [
		UserPostController,
		UserGetController,
		UsersGetController,
		UserPutController,
	],
	providers: [UserController],
})
export class UserModule {}
