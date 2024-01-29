import {UserServices} from "../services/user.services";
import {CategoryServices} from "../services/category.services";
import {TypeStudentGrantServices} from "../services/type.student.grant.services";
import {UserDALs} from '../database/data.access/user.dals';
import now = jest.now;
import {CategoryDALs} from "../database/data.access/category.dals";
import {TypeStudentGrantDALs} from "../database/data.access/type.student.grant.dals";

describe('userServices', () => {

    let userServices: UserServices;
    let categoryServices: CategoryServices;
    let typeStudentGrantServices: TypeStudentGrantServices;
    let mockUserDALs: UserDALs;
    let mockCategoryDALs: CategoryDALs;
    let mockTypeStudentGrantDALs: TypeStudentGrantDALs;

    beforeEach(async () => {
        userServices = new UserServices();
        mockUserDALs = new UserDALs();

        categoryServices = new CategoryServices();
        mockCategoryDALs = new CategoryDALs();

        typeStudentGrantServices = new TypeStudentGrantServices();
        mockTypeStudentGrantDALs = new TypeStudentGrantDALs();

        await categoryServices.deleteAllCategories();
        await typeStudentGrantServices.deleteAllTypeGrants();

        jest.clearAllMocks();
    });
    afterEach(async () => {
        await categoryServices.deleteAllCategories();
        await typeStudentGrantServices.deleteAllTypeGrants();

        jest.resetAllMocks();
    });

    const createMockCategory = (name: string) => ({
        id: 1,
        name,
        description: '',
        createdAt: new Date(now()),
        updatedAt: new Date(now())
    });
    const createMockTypeStudentGrant = (name: string) => ({
        id: 1,
        name,
        description: '',
        createdAt: new Date(now()),
        updatedAt: new Date(now())
    });
    const createMockUser = (name: string, enrollment: string, categoryId: number, typeStudentGrantId: number, dailyMeals: number) => ({
        id: 1,
        name,
        enrollment,
        categoryId,
        typeStudentGrantId,
        dailyMeals,
        createdAt: new Date(now()),
        updatedAt: new Date(now())
    });

    describe('createCategory', () => {
        test('should create a new category with name "Aluno"', async () => {
            const mockCategoryAluno = createMockCategory('Aluno');
            jest.spyOn(categoryServices, 'createCategory').mockResolvedValueOnce(mockCategoryAluno);

            const createdCategory = await categoryServices.createCategory({name: 'Aluno'});

            expect(createdCategory).toEqual(mockCategoryAluno);
        });
        test('should create a new category with name "Funcionário"', async () => {
            const mockCategoryFuncionario = createMockCategory('Funcionário');
            jest.spyOn(categoryServices, 'createCategory').mockResolvedValueOnce(mockCategoryFuncionario);

            const createdCategory = await categoryServices.createCategory({name: 'Funcionário'});

            expect(createdCategory).toEqual(mockCategoryFuncionario);
        });
        test('should create a new category with name "Externo"', async () => {
            const mockCategoryExterno = createMockCategory('Externo');
            jest.spyOn(categoryServices, 'createCategory').mockResolvedValueOnce(mockCategoryExterno);

            const createdCategory = await categoryServices.createCategory({name: 'Externo'});

            expect(createdCategory).toEqual(mockCategoryExterno);
        });
    });
    describe('createTypeGrant', () => {
        test('should create a new type student grant with name "Integral"', async () => {
            const mockTypeStudentGrantIntegral = createMockTypeStudentGrant('Integral')
            jest.spyOn(typeStudentGrantServices, 'createTypeGrant').mockResolvedValueOnce(mockTypeStudentGrantIntegral);

            const createdTypeStudentGrant = await typeStudentGrantServices.createTypeGrant({name: 'Integral'});

            expect(createdTypeStudentGrant).toEqual(mockTypeStudentGrantIntegral);
        });
        test('should create a new type student grant with name "Parcial"', async () => {
            const mockTypeStudentGrantParcial = createMockTypeStudentGrant('Parcial');
            jest.spyOn(typeStudentGrantServices, 'createTypeGrant').mockResolvedValueOnce(mockTypeStudentGrantParcial);

            const createdTypeStudentGrant = await typeStudentGrantServices.createTypeGrant({name: 'Parcial'});

            expect(createdTypeStudentGrant).toEqual(mockTypeStudentGrantParcial);
        });
        test('should create a new type student grant with name "Não aplicável"', async () => {
            const mockTypeStudentGrantNenhum = createMockTypeStudentGrant('Não aplicável');

            jest.spyOn(typeStudentGrantServices, 'createTypeGrant').mockResolvedValueOnce(mockTypeStudentGrantNenhum);

            const createdTypeStudentGrant = await typeStudentGrantServices.createTypeGrant({name: 'Não aplicável'});

            expect(createdTypeStudentGrant).toEqual(mockTypeStudentGrantNenhum);
        });
    });
    describe('createUser', () => {
        test('should create a new user', async () => {
            const mockCategory = createMockCategory('Aluno');
            const mockTypeStudentGrant = createMockCategory('Integral');
            const mockUser = createMockUser('João', '22333', mockCategory.id, mockTypeStudentGrant.id, 3)

            jest.spyOn(categoryServices, 'createCategory').mockResolvedValueOnce(mockCategory);
            jest.spyOn(typeStudentGrantServices, 'createTypeGrant').mockResolvedValueOnce(mockTypeStudentGrant);
            jest.spyOn(userServices, 'createUser').mockResolvedValueOnce(mockUser);

            const createdUser = await userServices.createUser({
                name: 'João',
                enrollment: '22333',
                categoryId: mockCategory.id,
                typeStudentGrantId: mockTypeStudentGrant.id,
                dailyMeals: 3
            });

            expect(createdUser).toEqual(mockUser);
        });
        test('should throw an error when trying to create a new user with repeated enrollment', async () => {
            // Mock the existing user with the same enrollment
            jest.spyOn(userServices.userDALs, 'existsUserByEnrollment').mockResolvedValueOnce(true);

            // Attempt to create a new user with the same enrollment
            await expect(
                userServices.createUser({
                    name: 'AnotherUser',
                    enrollment: '22333', // Repeated enrollment
                    categoryId: 1,
                    typeStudentGrantId: 1,
                    dailyMeals: 2,
                })
            ).rejects.toThrow('User enrollment already exists');
        });
        test('should throw an error when trying to create a new user with invalid daily meals: higher than 3', async () => {
            await expect(
                userServices.createUser({
                    name: 'AnotherUser',
                    enrollment: '22333',
                    categoryId: 1,
                    typeStudentGrantId: 1,
                    dailyMeals: 4, // Invalid daily meals
                })
            ).rejects.toThrow('Daily meals must be between 0 and 3');
        });
        test('should throw an error when trying to create a new user with invalid daily meals: negative', async () => {
            await expect(
                userServices.createUser({
                    name: 'AnotherUser',
                    enrollment: '22333',
                    categoryId: 1,
                    typeStudentGrantId: 1,
                    dailyMeals: -1, // Invalid daily meals
                })
            ).rejects.toThrow('Daily meals must be between 0 and 3');
        });
        test('should throw an error when trying to create a new user with invalid enrollment: empty', async () => {
            await expect(
                userServices.createUser({
                    name: 'AnotherUser',
                    enrollment: '', // Invalid enrollment
                    categoryId: 1,
                    typeStudentGrantId: 1,
                    dailyMeals: 2,
                })
            ).rejects.toThrow('Enrollment is required');
        });
    });
    describe('deleteById', () => {
        test('should delete an existing user successfully', async () => {
            const userId = '123';

            // Mock da função deleteUserById para retornar um usuário deletado
            mockUserDALs.deleteUserById = jest.fn().mockResolvedValue({ /* Seus dados de usuário aqui */});

            const result = await userServices.deleteById(userId);

            // Verifica se a função deleteUserById foi chamada com o ID correto
            expect(mockUserDALs.deleteUserById).toHaveBeenCalledWith(userId);

            // Verifica se o resultado é o usuário deletado
            expect(result).toEqual(result);
        });
        test('should throw an error if the user is not found', async () => {
            const userId = '123';

            // Mock da função deleteUserById para retornar null (usuário não encontrado)
            mockUserDALs.deleteUserById = jest.fn().mockResolvedValue(null);

            // Aguarda o lançamento de um erro
            await expect(userServices.deleteById(userId)).rejects.toThrow('User not found');

            // Verifica se a função deleteUserById foi chamada com o ID correto
            expect(mockUserDALs.deleteUserById).toHaveBeenCalledWith(userId);
        });
    });
    describe('updateUser', () => {
    test('deve atualizar um usuário existente com sucesso', async () => {
      const userId = 123;

      // Mock da função findUserById para retornar um usuário existente
      mockUserDALs.findUserById = jest.fn().mockResolvedValue({ /* Seus dados de usuário aqui */ });

      // Mock da função updateUser para retornar o usuário atualizado
      mockUserDALs.updateUser = jest.fn().mockResolvedValue({ /* Seus dados de usuário atualizados aqui */ });

      const userData = {
        id: userId,
        name: 'Novo Nome do Usuário',
        enrollment: '456',
        categoryId: 2,
        typeStudentGrantId: 2,
        dailyMeals: 2,
      };

      const result = await userServices.updateUser(userData);

      // Verifica se as funções foram chamadas corretamente
      expect(mockUserDALs.findUserById).toHaveBeenCalledWith(userId);
      expect(mockUserDALs.updateUser).toHaveBeenCalledWith(userData);

      // Verifica se o resultado é o usuário atualizado
      expect(result).toEqual({ result });
    });

    test('deve lançar um erro se o usuário não for encontrado', async () => {
      const userId = 123;

      // Mock da função findUserById para retornar null (usuário não encontrado)
      mockUserDALs.findUserById = jest.fn().mockResolvedValue(null);

      const userData = {
        id: userId,
        name: 'Novo Nome do Usuário',
        enrollment: '456',
        categoryId: 2,
        typeStudentGrantId: 2,
        dailyMeals: 2,
      };

      // Aguarda o lançamento de um erro
      await expect(userServices.updateUser(userData)).rejects.toThrow('User not found');

      // Verifica se a função findUserById foi chamada com o ID correto
      expect(mockUserDALs.findUserById).toHaveBeenCalledWith(userId);
    });

    
  });
});