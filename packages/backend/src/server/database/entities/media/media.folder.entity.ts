import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('node_folder_media')
export class NodeFolderMedia {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	folderName: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'datetime', nullable: true })
	updatedAt: Date;
}
