import { Injectable } from '@nestjs/common';
import { NodeAdmin } from '@server/database/entities/admin/admin.entity';
import { DataSource, DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { AdminRepository } from '../domain/admin.repository';

@Injectable()
export class AdminController implements AdminRepository {
	private admin: Repository<NodeAdmin>;

	constructor(private readonly dataSource: DataSource) {
		this.admin = this.dataSource.getRepository(NodeAdmin);
	}

	async findOneBy(id: number): Promise<any> {
		const admin = await this.admin.findOne({ where: { id } });
		return admin;
	}

	async count(params: unknown): Promise<number> {
		const count = await this.admin.count(params);
		return count;
	}

	async save(entity: DeepPartial<NodeAdmin>): Promise<void> {
		this.admin.save(entity);
		return;
	}

	async find(params: FindManyOptions<NodeAdmin> = {}): Promise<any> {
		const data = await this.admin.find(params);

		return {
			data,
			meta: {
				total: data.length,
				page: 1,
				per_page: 10,
			},
		};
	}

	async delete(id: number): Promise<void> {
		this.admin.delete(id);
		return;
	}

	async update(id: number, entity: any): Promise<void> {
		this.admin.update(id, entity);
		return;
	}
}
