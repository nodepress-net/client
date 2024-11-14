// ====================================
// Este decorador se encarga de asignar
// roles a los usuarios.
// ====================================

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
