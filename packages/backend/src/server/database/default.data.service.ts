import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NodeUserRole } from './entities/users/user.rol.entity';

@Injectable()
export class PreloadDataService {
	constructor(
		@InjectRepository(NodeUserRole)
		private readonly userRoleRepository: Repository<NodeUserRole>,
	) {}

	async insert() {
		// Comprobar si los roles por defecto ya existen
		const authenticatedRole = await this.userRoleRepository.findOne({
			where: { type: 'authenticated' },
		});
		const publicRole = await this.userRoleRepository.findOne({
			where: { type: 'public' },
		});

		if (!authenticatedRole) {
			const role = this.userRoleRepository.create({
				roleName: 'Authenticated',
				description: 'Default role given to authenticated user.',
				type: 'authenticated',
			});
			await this.userRoleRepository.save(role);
		}

		if (!publicRole) {
			const role = this.userRoleRepository.create({
				roleName: 'Public',
				description: 'Default role given to unauthenticated user.',
				type: 'public',
			});
			await this.userRoleRepository.save(role);
		}
	}
}
