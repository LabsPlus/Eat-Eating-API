import {TypeStudentGrantServices} from '../services/type.student.grant.services'; // Substitua pelo caminho real
import {TypeStudentGrantDALs} from '../database/data.access/type.student.grant.dals';
import now = jest.now;

describe('TypeStudentGrantServices', () => {
    let typeStudentGrantServices: TypeStudentGrantServices;
    let mockTypeStudentGrantDALs: TypeStudentGrantDALs;

    beforeEach(() => {
        mockTypeStudentGrantDALs = new TypeStudentGrantDALs();
        typeStudentGrantServices = new TypeStudentGrantServices();
        typeStudentGrantServices['typeStudentGrantDALs'] = mockTypeStudentGrantDALs;
    });

    afterEach(async () => {
        await typeStudentGrantServices.deleteAllTypeGrants();
        jest.clearAllMocks();
    });

    const createMockTypeStudentGrant = (name: string) => ({
        id: 1,
        name,
        description: '',
        createdAt: new Date(now()),
        updatedAt: new Date(now())
    });

    describe('createTypeGrant', () => {
        const mockTypeStudentGrant = createMockTypeStudentGrant('Teste');
        test('should create a typeGrant successfully', async () => {
            jest.spyOn(mockTypeStudentGrantDALs, 'createTypeGrant').mockResolvedValue(mockTypeStudentGrant);
            const createdTypeStudentGrantService = await typeStudentGrantServices.createTypeGrant(mockTypeStudentGrant);
            expect(createdTypeStudentGrantService).toEqual(mockTypeStudentGrant);
        });
        test('should throw an error if the typeGrant already exists', async () => {
            jest.spyOn(mockTypeStudentGrantDALs, 'findTypeGrantByName').mockResolvedValue(mockTypeStudentGrant);
            await expect(typeStudentGrantServices.createTypeGrant(mockTypeStudentGrant)).rejects.toThrow('Type grant name already exists');
            expect(mockTypeStudentGrantDALs.findTypeGrantByName).toHaveBeenCalledWith(mockTypeStudentGrant.name);
        });
    });

    describe('deleteTypeGrantById', () => {
        test('should successfully delete an existing typeGrant', async () => {
            const typeGrantId = '123';

            // Mock da função deleteTypeGrantById para retornar um tipo de bolsa deletado
            mockTypeStudentGrantDALs.deleteTypeGrantById = jest.fn().mockResolvedValue({ /* Seus dados de tipo de bolsa aqui */});

            const result = await typeStudentGrantServices.deleteTypeGrantById(typeGrantId);

            // Verifica se a função deleteTypeGrantById foi chamada com o ID correto
            expect(mockTypeStudentGrantDALs.deleteTypeGrantById).toHaveBeenCalledWith(typeGrantId);
            expect(result).toEqual(result);
        });
        test('should throw an error if the typeGrant is not found', async () => {
            const typeGrantId = '123';
            mockTypeStudentGrantDALs.deleteTypeGrantById = jest.fn().mockResolvedValue(null);
            await expect(typeStudentGrantServices.deleteTypeGrantById(typeGrantId)).rejects.toThrow('Category not found');
            expect(mockTypeStudentGrantDALs.deleteTypeGrantById).toHaveBeenCalledWith(typeGrantId);
        });
    });
});
