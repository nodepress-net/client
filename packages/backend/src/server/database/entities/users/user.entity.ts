import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NodeUserRole } from './user.rol.entity';

@Entity('node_user')
export class NodeUser {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@ManyToOne(() => NodeUserRole, (role: any) => role.users)
	role: NodeUserRole;

	@Column({ type: 'boolean', default: true })
	isActive: boolean;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'datetime', nullable: true })
	updatedAt: Date;
}
