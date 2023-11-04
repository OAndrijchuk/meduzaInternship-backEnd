import { BadRequestException } from '@nestjs/common';

export const CheckEmailExist =
  () =>
  (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const [createUserDto] = args;

      const existUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (existUser) {
        throw new BadRequestException('This email already exists!');
      }

      return originalMethod.apply(this, args);
    };
  };
