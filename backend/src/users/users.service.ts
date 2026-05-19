import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllCustomers() {
    const customers = await this.userRepository.find({
      where: {
        role: 'customer' as any,
      },
      order: {
        id: 'DESC',
      },
    });

    return customers.map((customer) => ({
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      role: customer.role,
      status: customer.status,
      createdAt: customer.createdAt,
    }));
  }

  async updateCustomerStatus(id: number, status: string) {
    const customer = await this.findById(id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    customer.status = status as any;

    const updatedCustomer = await this.userRepository.save(customer);

    return {
      message: 'Customer status updated successfully',
      customer: {
        id: updatedCustomer.id,
        fullName: updatedCustomer.fullName,
        email: updatedCustomer.email,
        phone: updatedCustomer.phone,
        role: updatedCustomer.role,
        status: updatedCustomer.status,
        createdAt: updatedCustomer.createdAt,
      },
    };
  }

  async deleteCustomer(id: number) {
    const customer = await this.findById(id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    await this.userRepository.delete(id);

    return {
      message: 'Customer deleted successfully',
    };
  }
}