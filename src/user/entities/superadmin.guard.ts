// superadmin.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Ensure that the user property is present in the request
    const user = request.user || request['user'];

    console.log('User Role:', user?.role); // Add this line for debugging

    // Check if the user is authenticated and has the role of SuperAdmin
    return user && user.role === 'SuperAdmin';
  }
}