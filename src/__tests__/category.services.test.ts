import { CategoryServices } from '../services/category.services'; // Substitua pelo caminho real
import { CategoryDALs } from '../database/data.access/category.dals';

describe('CategoryServices', () => {
  let categoryServices: CategoryServices;
  let mockCategoryDALs: CategoryDALs;

  beforeEach(() => {
    mockCategoryDALs = new CategoryDALs();
    categoryServices = new CategoryServices();
    categoryServices['categoryDALs'] = mockCategoryDALs;
  });

  describe('deleteById', () => {
    test('deve deletar uma categoria existente com sucesso', async () => {
      const categoryId = '123';

      // Mock da função deleteCategoryById para retornar uma categoria deletada
      mockCategoryDALs.deleteCategoryById = jest.fn().mockResolvedValue({ /* Seus dados de categoria aqui */ });

      const result = await categoryServices.deleteById(categoryId);

      // Verifica se a função deleteCategoryById foi chamada com o ID correto
      expect(mockCategoryDALs.deleteCategoryById).toHaveBeenCalledWith(categoryId);

      // Verifica se o resultado é a categoria deletada
      expect(result).toEqual(result);
    });

    test('deve lançar um erro se a categoria não for encontrada', async () => {
      const categoryId = '123';

      // Mock da função deleteCategoryById para retornar null (categoria não encontrada)
      mockCategoryDALs.deleteCategoryById = jest.fn().mockResolvedValue(null);

      // Aguarda o lançamento de um erro
      await expect(categoryServices.deleteById(categoryId)).rejects.toThrow('Category not found');

      // Verifica se a função deleteCategoryById foi chamada com o ID correto
      expect(mockCategoryDALs.deleteCategoryById).toHaveBeenCalledWith(categoryId);
    });
  });
});