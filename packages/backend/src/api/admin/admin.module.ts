import { Module } from '@nestjs/common';
import { CryptoService } from '@shared/module/crypto/crypto.service';
import { PasswordService } from '@shared/module/password/password.service';
import { TokenService } from '@shared/module/token/token.service';
import { AdminCreate } from './application/admin.create';
import { AdminController } from './infrastructure/admin.db.controller';
import { AdminGetController } from './infrastructure/controller/admin.get.controller';
import { AdminPostController } from './infrastructure/controller/admin.post.controller';

@Module({
	imports: [],
	controllers: [AdminGetController, AdminPostController],
	providers: [
		AdminController,
		AdminCreate,
		PasswordService,
		CryptoService,
		TokenService,
	],
	exports: [],
})
export class AdminModule {}
