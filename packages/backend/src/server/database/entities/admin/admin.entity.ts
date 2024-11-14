import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NodeAdminRole } from './admin.rol.entity';

@Entity('node_admin')
export class NodeAdmin {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	lastname: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@ManyToOne(() => NodeAdminRole, (role: any) => role.admins)
	role: NodeAdminRole;

	@Column({ type: 'boolean', default: true })
	isActive: boolean;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'datetime', nullable: true })
	updatedAt: Date;
}
