import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('customers')
  getAllCustomers() {
    return this.usersService.getAllCustomers();
  }

  @Patch('customers/:id/status')
  updateCustomerStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.usersService.updateCustomerStatus(Number(id), status);
  }

  @Delete('customers/:id')
  deleteCustomer(@Param('id') id: string) {
    return this.usersService.deleteCustomer(Number(id));
  }
}