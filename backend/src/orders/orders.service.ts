import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Cart } from '../carts/entities/cart.entity';
import { CartItem } from '../carts/entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private mailService: MailService,
  ) {}

  async placeOrder(userId: number, createOrderDto: CreateOrderDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['items', 'items.product'],
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const order = this.orderRepository.create({
      user: user,
      totalAmount: cart.total,
      address: createOrderDto.address,
      paymentMethod: createOrderDto.paymentMethod,
    });

    const savedOrder = await this.orderRepository.save(order);

    for (const cartItem of cart.items) {
      const product = cartItem.product;

      if (product.stock < cartItem.quantity) {
        throw new BadRequestException(
          `${product.name} does not have enough stock`,
        );
      }

      const orderItem = this.orderItemRepository.create({
        order: savedOrder,
        product: product,
        quantity: cartItem.quantity,
        price: cartItem.price,
      });

      await this.orderItemRepository.save(orderItem);

      product.stock = product.stock - cartItem.quantity;
      await this.productRepository.save(product);
    }

    await this.cartItemRepository.remove(cart.items);

    cart.total = 0;
    await this.cartRepository.save(cart);

    const fullOrder = await this.getOrderById(savedOrder.id);

    await this.mailService.sendOrderConfirmationEmail(fullOrder);

    return {
      message: 'Order placed successfully',
      orderId: savedOrder.id,
      totalAmount: savedOrder.totalAmount,
    };
  }

  async getMyOrders(userId: number) {
    return await this.orderRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['items', 'items.product'],
      order: {
        id: 'DESC',
      },
    });
  }

  async getAllOrders() {
    return await this.orderRepository.find({
      relations: ['user', 'items', 'items.product'],
      order: {
        id: 'DESC',
      },
    });
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id: id },
      relations: ['user', 'items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrderStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const order = await this.getOrderById(id);

    order.orderStatus = updateOrderStatusDto.orderStatus;

    const updatedOrder = await this.orderRepository.save(order);

    const fullOrder = await this.getOrderById(updatedOrder.id);

    await this.mailService.sendOrderStatusEmail(fullOrder);

    return {
      message: 'Order status updated successfully',
      order: {
        id: fullOrder.id,
        totalAmount: fullOrder.totalAmount,
        address: fullOrder.address,
        paymentMethod: fullOrder.paymentMethod,
        orderStatus: fullOrder.orderStatus,
        paymentStatus: fullOrder.paymentStatus,
        createdAt: fullOrder.createdAt,
        user: {
          id: fullOrder.user.id,
          fullName: fullOrder.user.fullName,
          email: fullOrder.user.email,
          phone: fullOrder.user.phone,
          role: fullOrder.user.role,
          status: fullOrder.user.status,
        },
        items: fullOrder.items,
      },
    };
  }
}