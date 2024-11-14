import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('node_setting')
export class NodeSetting {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number = 1; // Siempre será 1, garantizando una única fila

	@Column()
	existOwner: boolean;

	@Column({ type: 'boolean', default: false })
	maintenanceMode: boolean;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'datetime', nullable: true })
	updatedAt: Date;
}
