import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';

export const Auth = (...authTypes: AuthType[]) => SetMetadata('authType', authTypes);
