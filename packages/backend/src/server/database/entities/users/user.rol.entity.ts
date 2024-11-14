import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('node_user_role')
export class NodeUserRole {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	roleName: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@Column({ type: 'varchar' }) // Cambiar a varchar en lugar de enum
	type: string; // Aceptamos string, pero validaremos los valores permitidos

	@Column({ type: 'boolean', default: true })
	isActive: boolean;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'datetime', nullable: true })
	updatedAt: Date;
}
