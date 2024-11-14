import { UUIDController } from '../infrastructure/uuid.controller';

export class UUIDService {
	private uuid: UUIDController;

	constructor() {
		this.uuid = new UUIDController();
	}

	create() {
		return this.uuid.create();
	}
}
