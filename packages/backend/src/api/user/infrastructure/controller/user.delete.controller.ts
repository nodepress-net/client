import { Controller } from '@nestjs/common';
import { Api } from '@server/pipe/api.version.pipe';

@Controller(Api('user'))
export class UserDeleteController {}
