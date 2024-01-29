import { prisma } from '../prisma.databases';
import {
  ICategoryCreate,
  ICategoryUpdate,
} from '../../intefaces/category.interfaces';

class CategoryDALs {
  async createCategory({ name, description }: ICategoryCreate) {
    const result = await prisma.category.create({
      data: { name, description },
    });
    return result;
  }

  async deleteAllCategories() {
    const result = await prisma.category.deleteMany();
    return result;
  }

  async findCategoriaByName(name: string) {
    const result = await prisma.category.findFirst({
      where: {
        name: name,
      },
    });
    return result;
  }

  async getAllCategories() {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async existsCategory(categoryId: number | undefined): Promise<boolean> {
    const result = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return Boolean(result); // Retorna true se result não for nulo, e false caso contrário
  }

  async updateCategory(data: ICategoryUpdate) {
    const category = await prisma.category.update({
      where: { id: data.id },
      data: data,
    });
    return category;
  }
  async deleteCategoryById(id: string) {
    const category = await prisma.category.delete({
      where: { id: Number(id) },
    });
    return category;
  }
}

export { CategoryDALs };
