import { Module } from '@nestjs/common';
import { serviceErrorGroup } from './';
import { C_ERROR_GROUP } from './constants';

@Module({
  providers: [
    {
      provide: C_ERROR_GROUP,
      useValue: serviceErrorGroup
    }
  ],
  exports: [C_ERROR_GROUP]
})
export class ErrorsModule {}
