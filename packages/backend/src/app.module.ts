import { AdminModule } from '@api/admin/admin.module';
import { UserModule } from '@api/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@server/database/database.module';
import { PreloadDataService } from '@server/database/default.data.service';
import { CustomModule } from '@server/database/dynamic/custom.module';
import { NodeUserRole } from '@server/database/entities/users/user.rol.entity';
import { I18nModule } from 'nestjs-i18n';
import { i18nConfig } from './i18n/config';

@Module({
	imports: [
		I18nModule.forRoot(i18nConfig),
		ConfigModule.forRoot(),
		ScheduleModule.forRoot(),
		TypeOrmModule.forFeature([NodeUserRole]),
		DatabaseModule,
		UserModule,
		AdminModule,
		CustomModule.forRoot(),
	],
	controllers: [],
	providers: [PreloadDataService],
})
export class AppModule {}
