import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('node_user_permission')
export class NodeUserPermission {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	permissionName: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@Column({ type: 'boolean', default: true })
	isActive: boolean;
}
