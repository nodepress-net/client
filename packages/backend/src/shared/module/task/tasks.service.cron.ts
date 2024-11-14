import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ChannelRemoveCron } from './tasks/channel.remove.cron';
import { UserRemoveCron } from './tasks/user.remove.cron';

@Injectable()
export class TasksService {
	private readonly userRemove: UserRemoveCron;
	private readonly channelRemove: ChannelRemoveCron;

	constructor() {
		this.userRemove = new UserRemoveCron();
		this.channelRemove = new ChannelRemoveCron();
	}

	@Cron(CronExpression.EVERY_DAY_AT_NOON)
	async handleCron() {
		await this.channelRemove.execute();
		await this.userRemove.execute();
	}
}
