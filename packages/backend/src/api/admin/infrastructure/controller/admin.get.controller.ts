import { Controller } from '@nestjs/common';
import { Api } from '@server/pipe/api.version.pipe';

@Controller(Api('admin'))
export class AdminGetController {
	constructor() {}
}
