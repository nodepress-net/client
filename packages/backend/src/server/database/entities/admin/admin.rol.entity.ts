import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('node_admin_role')
export class NodeAdminRole {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	roleName: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@Column({ type: 'boolean', default: true })
	isActive: boolean;
}
