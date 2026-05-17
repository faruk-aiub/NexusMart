import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new BadRequestException('Category name already exists');
    }

    const category = this.categoryRepository.create(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);

    return {
      message: 'Category created successfully',
      category: savedCategory,
    };
  }

  async getAllCategories() {
    return await this.categoryRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.getCategoryById(id);

    if (updateCategoryDto.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: updateCategoryDto.name },
      });

      if (existingCategory && existingCategory.id !== id) {
        throw new BadRequestException('Category name already exists');
      }
    }

    Object.assign(category, updateCategoryDto);

    const updatedCategory = await this.categoryRepository.save(category);

    return {
      message: 'Category updated successfully',
      category: updatedCategory,
    };
  }

  async deleteCategory(id: number) {
    const category = await this.getCategoryById(id);

    await this.categoryRepository.remove(category);

    return {
      message: 'Category deleted successfully',
    };
  }
}