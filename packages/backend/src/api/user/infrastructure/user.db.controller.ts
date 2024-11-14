import { Injectable } from '@nestjs/common';
import { NodeUser } from '@server/database/entities/users/user.entity';
import { DataSource, DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class UserController implements UserRepository {
	private user: Repository<NodeUser>;

	constructor(private readonly dataSource: DataSource) {
		this.user = this.dataSource.getRepository(NodeUser);
	}

	async findOneBy(id: number): Promise<any> {
		const user = await this.user.findOne({ where: { id } });
		return user;
	}

	async count(params: unknown): Promise<number> {
		const count = await this.user.count(params);
		return count;
	}

	async save(entity: DeepPartial<NodeUser>): Promise<void> {
		await this.user.save(entity);
		return;
	}

	async find(params: FindManyOptions<NodeUser> = {}): Promise<any> {
		const users = await this.user.find(params);
		return users;
	}

	async delete(id: number): Promise<void> {
		await this.user.delete(id);
		return;
	}

	async update(id: number, entity: any): Promise<void> {
		await this.user.update(id, entity);
		return;
	}
}
