import { applyDecorators } from '@nestjs/common';
import {
  CreateUserDto,
  UserDto,
} from './dto';
import { HTTP_STATUS } from 'src/common';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/dto';

const MeSwagger = (): any => {
  return applyDecorators(
    ApiOperation({ summary: 'Endpoint to obtain data about yourself.' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'User model with profile',
      type: UserDto,
    }),
    ApiResponse({ status: HTTP_STATUS.UNAUTHORIZED }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND })
  );
};

const CreateUserSwagger = (): any => {
  return applyDecorators(
    ApiOperation({ summary: 'Create user' }),
    ApiBody({
      type: CreateUserDto,
    }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      type: SuccessResponseDto,
    }),
    ApiResponse({ status: HTTP_STATUS.UNAUTHORIZED }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND })
  );
};

const DeleteUsersSwagger = (): any => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete the list of admins by ids' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      type: [SuccessResponseDto],
    }),
    ApiResponse({ status: HTTP_STATUS.UNAUTHORIZED }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND })
  );
};

const RetrieveUsersSwagger = (): any => {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve all users' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      type: [UserDto],
    }),
    ApiResponse({ status: HTTP_STATUS.UNAUTHORIZED }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND })
  );
};

export {
  MeSwagger,
  CreateUserSwagger,
  RetrieveUsersSwagger,
  DeleteUsersSwagger
};
