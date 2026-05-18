import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getOrCreateCart(userId: number) {
    let cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user', 'items', 'items.product'],
    });

    if (!cart) {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      cart = this.cartRepository.create({
        user: user,
        total: 0,
      });

      cart = await this.cartRepository.save(cart);
    }

    return cart;
  }

  async getMyCart(userId: number) {
    const cart = await this.getOrCreateCart(userId);

    return {
      id: cart.id,
      total: cart.total,
      items: cart.items || [],
    };
  }

  async addItemToCart(userId: number, addCartItemDto: AddCartItemDto) {
    const cart = await this.getOrCreateCart(userId);

    const product = await this.productRepository.findOne({
      where: { id: addCartItemDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < addCartItemDto.quantity) {
      throw new BadRequestException('Quantity is greater than available stock');
    }

    let cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: {
          id: cart.id,
        },
        product: {
          id: product.id,
        },
      },
      relations: ['cart', 'product'],
    });

    const productPrice = product.discountPrice || product.price;

    if (cartItem) {
      const newQuantity = cartItem.quantity + addCartItemDto.quantity;

      if (product.stock < newQuantity) {
        throw new BadRequestException('Quantity is greater than available stock');
      }

      cartItem.quantity = newQuantity;
      cartItem.price = productPrice;
    } else {
      cartItem = this.cartItemRepository.create({
        cart: cart,
        product: product,
        quantity: addCartItemDto.quantity,
        price: productPrice,
      });
    }

    await this.cartItemRepository.save(cartItem);
    await this.updateCartTotal(cart.id);

    return {
      message: 'Product added to cart successfully',
    };
  }

  async updateCartItem(
    userId: number,
    cartItemId: number,
    updateCartItemDto: UpdateCartItemDto,
  ) {
    const cart = await this.getOrCreateCart(userId);

    const cartItem = await this.cartItemRepository.findOne({
      where: {
        id: cartItemId,
        cart: {
          id: cart.id,
        },
      },
      relations: ['product', 'cart'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.product.stock < updateCartItemDto.quantity) {
      throw new BadRequestException('Quantity is greater than available stock');
    }

    cartItem.quantity = updateCartItemDto.quantity;
    await this.cartItemRepository.save(cartItem);

    await this.updateCartTotal(cart.id);

    return {
      message: 'Cart item updated successfully',
    };
  }

  async removeCartItem(userId: number, cartItemId: number) {
    const cart = await this.getOrCreateCart(userId);

    const cartItem = await this.cartItemRepository.findOne({
      where: {
        id: cartItemId,
        cart: {
          id: cart.id,
        },
      },
      relations: ['cart'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.remove(cartItem);
    await this.updateCartTotal(cart.id);

    return {
      message: 'Cart item removed successfully',
    };
  }

  async updateCartTotal(cartId: number) {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    });

    if (!cart) {
      return;
    }

    let total = 0;

    for (const item of cart.items) {
      total = total + item.price * item.quantity;
    }

    cart.total = total;

    await this.cartRepository.save(cart);
  }
}