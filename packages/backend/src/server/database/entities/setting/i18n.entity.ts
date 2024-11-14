import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('node_i18n')
export class NodeI18n {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	key: string;

	@Column()
	language: string;

	@Column('text')
	translation: string;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'datetime', nullable: true })
	updatedAt: Date;
}
