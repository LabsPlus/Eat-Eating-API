import {UserServices} from "../services/user.services";
import {CategoryServices} from "../services/category.services";
import {UserDALs} from '../database/data.access/user.dals';
import now = jest.now;
import {CategoryDALs} from "../database/data.access/category.dals";

describe('userServices', () => {

    let userServices: UserServices;
    let categoryServices: CategoryServices;
    let mockUserDALs: UserDALs;
    let mockCategoryDALs: CategoryDALs;

    const createMockCategory = (name: string) => ({
        id: 1,
        name,
        description: '',
        createdAt: new Date(now()),
        updatedAt: new Date(now())
    });

    beforeEach(async () => {
        userServices = new UserServices();
        categoryServices = new CategoryServices();

        mockUserDALs = new UserDALs();
        mockCategoryDALs = new CategoryDALs();

        userServices['userDALs'] = mockUserDALs;
        categoryServices['categoryDALs'] = mockCategoryDALs;
    });

    afterEach(async () => {
        await categoryServices.deleteAllCategories();
        await userServices.deleteAllUsers();

        jest.resetAllMocks();
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

    describe('createUser', () => {
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
        test('should successfully update an existing user', async () => {
            const userId = 123;

            // Mock da função findUserById para retornar o usuário existente
            const existingUserData = {
                id: userId,
                name: 'Nome Antigo do Usuário',
                enrollment: '123',
                categoryId: 1,
                typeStudentGrantId: 1,
                dailyMeals: 1,
                // Outros campos do usuário conforme necessário
            };
            mockUserDALs.findUserById = jest.fn().mockResolvedValue(existingUserData);

            const updatedUserData = {
                id: userId,
                name: 'Novo Nome do Usuário',
                enrollment: '456',
                categoryId: 2,
                typeStudentGrantId: 2,
                dailyMeals: 2,
                // Outros campos atualizados conforme necessário
            };

            // Mock da função updateUser para retornar os dados atualizados do usuário
            mockUserDALs.updateUser = jest.fn().mockResolvedValue(updatedUserData);

            // Chama a função updateUser com os dados atualizados
            const result = await userServices.updateUser(updatedUserData);

            // Verifica se a função findUserById foi chamada com o ID correto
            expect(mockUserDALs.findUserById).toHaveBeenCalledWith(userId);

            // Verifica se a função updateUser foi chamada com os dados atualizados do usuário
            expect(mockUserDALs.updateUser).toHaveBeenCalledWith(updatedUserData);

            // Verifica se o resultado retornado pela função updateUser é os dados atualizados do usuário
            expect(result).toEqual(updatedUserData);
        });
        test('should throw an error if the user is not found', async () => {
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
