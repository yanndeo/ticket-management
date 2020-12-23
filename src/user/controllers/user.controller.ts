import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {}
