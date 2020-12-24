import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    delete user.delete_at;
    delete user.updated_at;
    delete user.created_at;
    //const profile = user.profile;
    if (user && user.profile) {
      const { nationality, address, mobile, fixe, ...res } = user?.profile;
      user.profile = res;
    }
    //delete profile.id, profile.firstname;

    return data ? user && user[data] : user;
  },
);
