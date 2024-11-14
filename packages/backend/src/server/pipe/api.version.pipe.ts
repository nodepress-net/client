// ====================================
// Este es un Pipe que se encarga
// de validar la versión de la API
// ====================================

import { SERVER } from '@server/constant/server.const';

export function Api(path: string, version = SERVER.VERSION_API) {
	return {
		version,
		path,
	};
}
