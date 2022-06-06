import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  Post,
  Query,
  Delete, Param, Patch,
} from '@nestjs/common';
import { IRequestWithUser, ISuccessResponse } from 'src/common/interfaces';
import {
  CreateUserDto,
  RetrieveUsersQueryDto,
  DeleteUsersDto, UpdateUserDto,
} from './dto';
import { IUser } from './interfaces';
import { UserService } from './user.service';
import { EUserRoles, IPaginationResults, Roles } from 'src/common';
import { ApiTags, ApiBearerAuth, ApiExcludeEndpoint, ApiConsumes } from '@nestjs/swagger';
import {
  MeSwagger,
  CreateUserSwagger,
  RetrieveUsersSwagger,
  DeleteUsersSwagger
} from './user.swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @MeSwagger()
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  public async me(@Req() req: IRequestWithUser): Promise<IUser> {
    const { user } = req;

    return user;
  }

  @ApiBearerAuth()
  @CreateUserSwagger()
  @Post('')
  @Roles(EUserRoles.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'))
  public async createUser(
    @Body() body: CreateUserDto
  ): Promise<ISuccessResponse> {
    await this.userService.create(body);
    return { success: true };
  }

  @ApiBearerAuth()
  @RetrieveUsersSwagger()
  @Get('')
  @Roles(EUserRoles.SUPER_ADMIN, EUserRoles.USER)
  @UseGuards(AuthGuard('jwt'))
  public async retrieveUsers(
    @Req() req: IRequestWithUser,
    @Query() query: RetrieveUsersQueryDto
  ): Promise<IUser[]> {
    return this.userService.retrieveUsers(query, req.user);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles(EUserRoles.SUPER_ADMIN, EUserRoles.USER)
  @UseGuards(AuthGuard('jwt'))
  public async updateUser(
      @Req() req: IRequestWithUser,
      @Param('id') id: string,
      @Body() body: UpdateUserDto,
      ): Promise<IUser> {
    return this.userService.updateUser(id, body, req.user);
  }

  @ApiBearerAuth()
  @DeleteUsersSwagger()
  @Delete('')
  @Roles(EUserRoles.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'))
  public async deleteUsers(@Query() query: DeleteUsersDto): Promise<ISuccessResponse> {
    return this.userService.deleteUsers(query.users);
  }

}
