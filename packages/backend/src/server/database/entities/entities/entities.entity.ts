import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('node_user')
export class NodeEntities {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	// columna con la configuración del schema, será un JSON
	@Column('simple-json')
	schema: any;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'datetime', nullable: true })
	updatedAt: Date;
}
