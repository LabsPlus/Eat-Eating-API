import {CategoryServices} from '../services/category.services';
import {CategoryDALs} from '../database/data.access/category.dals';
import now = jest.now;

describe('CategoryServices', () => {
    let categoryServices: CategoryServices;
    let mockCategoryDALs: CategoryDALs;

    beforeEach(() => {
        mockCategoryDALs = new CategoryDALs();
        categoryServices = new CategoryServices();
        categoryServices['categoryDALs'] = mockCategoryDALs;
    });

    afterEach(async () => {
        await categoryServices.deleteAllCategories();
    });

    const createMockCategory = (name: string) => ({
        id: 1,
        name,
        description: '',
        createdAt: new Date(now()),
        updatedAt: new Date(now())
    });

    describe('createCategory', () => {
        const mockCategory = createMockCategory('Teste');
        test('should create a category successfully', async () => {
            jest.spyOn(mockCategoryDALs, 'createCategory').mockResolvedValue(mockCategory);
            const createdCategoryService = await categoryServices.createCategory(mockCategory);
            expect(createdCategoryService).toEqual(mockCategory);
        });
        test('should throw an error if the category already exists', async () => {
            jest.spyOn(mockCategoryDALs, 'findCategoriaByName').mockResolvedValue(mockCategory);
            await expect(categoryServices.createCategory(mockCategory)).rejects.toThrow('Category already exists');
            expect(mockCategoryDALs.findCategoriaByName).toHaveBeenCalledWith(mockCategory.name);
        });
    })

    describe('deleteById', () => {
        test('should successfully delete an existing category', async () => {
            const categoryId = '123';

            // Mock da função deleteCategoryById para retornar uma categoria deletada
            mockCategoryDALs.deleteCategoryById = jest.fn().mockResolvedValue({ /* Seus dados de categoria aqui */});

            const result = await categoryServices.deleteById(categoryId);

            // Verifica se a função deleteCategoryById foi chamada com o ID correto
            expect(mockCategoryDALs.deleteCategoryById).toHaveBeenCalledWith(categoryId);

            // Verifica se o resultado é a categoria deletada
            expect(result).toEqual(result);
        });
        test('should throw an error if the category is not found', async () => {
            const categoryId = '123';

            // Mock da função deleteCategoryById para retornar null (categoria não encontrada)
            mockCategoryDALs.deleteCategoryById = jest.fn().mockResolvedValue(null);

            // Aguarda o lançamento de um erro
            await expect(categoryServices.deleteById(categoryId)).rejects.toThrow('Category not found');

            // Verifica se a função deleteCategoryById foi chamada com o ID correto
            expect(mockCategoryDALs.deleteCategoryById).toHaveBeenCalledWith(categoryId);
        });
    });

    describe('updateCategory', () => {
        test('should successfully update an existing category', async () => {
            const categoryId = 123;

            // Mock da função existsCategory para retornar true (categoria existe)
            mockCategoryDALs.existsCategory = jest.fn().mockResolvedValue(true);

            // Mock da função updateCategory para retornar a categoria atualizada
            mockCategoryDALs.updateCategory = jest.fn().mockResolvedValue({ /* Seus dados de categoria atualizados aqui */});

            const categoryData = {
                id: categoryId,
                name: 'Novo Nome da Categoria',
                description: 'Nova Descrição da Categoria',
            };

            const result = await categoryServices.updateCategory(categoryData);

            // Verifica se as funções foram chamadas corretamente
            expect(mockCategoryDALs.existsCategory).toHaveBeenCalledWith(categoryId);
            expect(mockCategoryDALs.updateCategory).toHaveBeenCalledWith(categoryData);

            // Verifica se o resultado é a categoria atualizada
            expect(result).toEqual({ /* Seus dados de categoria atualizados aqui */});
        });

        test('should throw an error if the category is not found', async () => {
            const categoryId = 123;

            // Mock da função existsCategory para retornar false (categoria não encontrada)
            mockCategoryDALs.existsCategory = jest.fn().mockResolvedValue(false);

            const categoryData = {
                id: categoryId,
                name: 'Novo Nome da Categoria',
                description: 'Nova Descrição da Categoria',
            };

            // Aguarda o lançamento de um erro
            await expect(categoryServices.updateCategory(categoryData)).rejects.toThrow('Category not found');

            // Verifica se a função existsCategory foi chamada com o ID correto
            expect(mockCategoryDALs.existsCategory).toHaveBeenCalledWith(categoryId);
        });
    });
});