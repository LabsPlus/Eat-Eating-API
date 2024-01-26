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
        jest.clearAllMocks();
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
});