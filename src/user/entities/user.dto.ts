  export class CreateUserDto {
      readonly fullName: string;
      readonly login: string;
      readonly password: string;
      readonly picture: string;
    }
    
    export class UpdateUserDto {
      readonly fullName?: string;
      readonly login?: string;
      readonly password?: string;
      readonly picture?:string;
    }
    