import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const existingProduct = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });

    if (existingProduct) {
      throw new BadRequestException('Product name already exists');
    }

    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      discountPrice: createProductDto.discountPrice,
      stock: createProductDto.stock,
      image: createProductDto.image,
      status: createProductDto.status,
      category: category,
    });

    const savedProduct = await this.productRepository.save(product);

    return {
      message: 'Product created successfully',
      product: savedProduct,
    };
  }

  async getAllProducts() {
    return await this.productRepository.find({
      relations: ['category'],
      order: {
        id: 'ASC',
      },
    });
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.getProductById(id);

    if (updateProductDto.name) {
      const existingProduct = await this.productRepository.findOne({
        where: { name: updateProductDto.name },
      });

      if (existingProduct && existingProduct.id !== id) {
        throw new BadRequestException('Product name already exists');
      }
    }

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateProductDto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      product.category = category;
    }

    product.name = updateProductDto.name ?? product.name;
    product.description = updateProductDto.description ?? product.description;
    product.price = updateProductDto.price ?? product.price;
    product.discountPrice =
      updateProductDto.discountPrice ?? product.discountPrice;
    product.stock = updateProductDto.stock ?? product.stock;
    product.image = updateProductDto.image ?? product.image;
    product.status = updateProductDto.status ?? product.status;

    const updatedProduct = await this.productRepository.save(product);

    return {
      message: 'Product updated successfully',
      product: updatedProduct,
    };
  }

  async deleteProduct(id: number) {
    const product = await this.getProductById(id);

    await this.productRepository.remove(product);

    return {
      message: 'Product deleted successfully',
    };
  }
}