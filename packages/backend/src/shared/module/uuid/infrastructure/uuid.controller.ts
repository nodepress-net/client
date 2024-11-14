import * as Crypto from 'crypto';
import { UUIDRepository } from '../domain/uuid.repository';
import { UUID } from '../domain/uuid.type';

export class UUIDController implements UUIDRepository {
	create(): UUID {
		return this.uuidv4();
	}

	private uuidv4(): UUID {
		return Crypto.randomUUID();
	}
}
