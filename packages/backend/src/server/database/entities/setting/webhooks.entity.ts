import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('node_webhooks')
export class NodeWebhooks {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	url: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@Column()
	method: string; // GET, POST, PUT, etc.

	@Column({ type: 'boolean', default: true })
	isActive: boolean;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
