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

    beforeEach(async () => {
        userServices = new UserServices();
        categoryServices = new CategoryServices();
        typeStudentGrantServices = new TypeStudentGrantServices();

        mockUserDALs = new UserDALs();
        mockCategoryDALs = new CategoryDALs();
        mockTypeStudentGrantDALs = new TypeStudentGrantDALs();

        userServices['userDALs'] = mockUserDALs;
        categoryServices['categoryDALs'] = mockCategoryDALs;
        typeStudentGrantServices['typeStudentGrantDALs'] = mockTypeStudentGrantDALs;
    });

    afterEach(async () => {
        await categoryServices.deleteAllCategories();
        await typeStudentGrantServices.deleteAllTypeGrants();
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