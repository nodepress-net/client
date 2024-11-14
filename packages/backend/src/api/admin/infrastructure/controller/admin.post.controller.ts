import { Controller, Post, UseFilters } from '@nestjs/common';
import { Api } from '@server/pipe/api.version.pipe';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';

@Controller(Api('admin'))
export class AdminPostController {
	constructor() {}

	@Post()
	@UseFilters(new I18nValidationExceptionFilter())
	async create(/* @Body() body: AdminDto */): Promise<any> {
		//const data = await this.adminCreate.execute(body);
		return {};
	}
}
