import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) { }

  @Public()
  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }


  /**
   * @api {post} /auth/login Login the users's account
   * @apiVersion 0.1.0
   * @apiGroup Auth
   * @apiPermission none
   * 
   * @apiParam {String} email User's email address
   * @apiParam {String} password User's password
   * 
   * @apiSuccess {String} status The request status (success|failed)
   * @apiSuccess {Object} data The users's details
   * 
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *      "status": "success",
   *      "data": {
   *        "id": 1,
   *        "name": "John Doe",
   *        "email": "john.doe@test.com",
   *        "role": "User",
   *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRhbWVyIEluYXd5IiwiZW1haWwiOiJ0YW1lci0xQHRlc3QuY29tIiwicm9sZSI6IkNlbGVicml0eSIsImlhdCI6MTU4MjgzNjU2MiwiZXhwIjoxNTgzNDQxMzYyfQ.f-p3a5F30K12dG_FW5Hkm7kAWjTK6WjoJJ25t6glboM"
   *    }
   *        }
   *    }
    * @apiErrorExample {json} List error
   *    HTTP/1.1 401 Unauthorized
   *    {
   *      "status": "failed",
   *      "error": {
   *        "message": "Invalid email or password!"
   *      }
   *    }
   */

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne(req.user.userId);
    if (!user) {
      return null;
    }

    return user;
  }
}
