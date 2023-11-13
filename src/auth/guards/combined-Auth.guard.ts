import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CombinedAuthGuard extends AuthGuard(['auth0', 'jwt']) {
  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user.iss === 'https://dev-pv56md3tahktd2by.us.auth0.com/') {
      // Логіка для Auth0Strategy
      console.log('<<<<Auth0Strategy>>>>');
    } else {
      // Логіка для JwtStrategy
      console.log('<<<<JwtStrategy>>>>');
    }

    return user;
  }
}
