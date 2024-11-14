import { Injectable } from '@nestjs/common';
import { SCOPE } from './scope.type';

@Injectable()
export class ScopeService {
	defaultViewer(): string {
		return [
			SCOPE.USER_READ,
			SCOPE.USER_UPDATE,
			SCOPE.CREATE_CHANNEL,
			SCOPE.UPDATE_CHANNEL,
			SCOPE.READ_CHANNEL,
			SCOPE.DELETE_CHANNEL,
		].join(',');
	}

	defaultStreamer(): string {
		return [
			SCOPE.USER_READ,
			SCOPE.USER_UPDATE,
			SCOPE.UPDATE_CHANNEL,
			SCOPE.READ_CHANNEL,
			SCOPE.DELETE_CHANNEL,
		].join(',');
	}

	defaultRecovery(): string {
		return [SCOPE.USER_READ, SCOPE.USER_UPDATE].join(',');
	}
}
