import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Res,
  Param,
  Req,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as dotenv from 'dotenv';
import { CombinedAuthGuard } from './guards/combined-Auth.guard';
dotenv.config();
const { CLIENT_URL } = process.env;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @HttpCode(201)
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @HttpCode(200)
  @Post('signIn')
  async signIn(@Res({ passthrough: true }) res, @Body() { email, password }) {
    return await this.authService.signIn(res, email, password);
  }

  @Get('verify/:verificationKey')
  async verify(
    @Res({ passthrough: true }) res,
    @Param('verificationKey') verificationKey: string,
  ) {
    res.redirect(CLIENT_URL);
    return this.authService.verify(verificationKey);
  }

  @UseGuards(CombinedAuthGuard)
  @HttpCode(200)
  @Post('logOut')
  async logOut(@Req() req, @Res({ passthrough: true }) res) {
    const { refreshToken } = req.cookies;
    const token = await this.authService.logOut(refreshToken);
    res.clearCookie('refreshToken');
    return token;
  }

  @Get('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res) {
    const { refreshToken } = req.cookies;
    const token = await this.authService.refresh(res, refreshToken);
    return token;
  }

  // @UseGuards(CombinedAuthGuard)
  // @Get('test')
  // async test() {
  //   console.log('hallo from Auth0');
  // }
}
