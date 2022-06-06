import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { SignInDto } from '../dto';
import { IUser } from 'src/modules/user/interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false
    });
  }

  public async validate(email: SignInDto['email'], password: SignInDto['password']): Promise<IUser> {
    return this.authService.login({ email, password });
  }
}
