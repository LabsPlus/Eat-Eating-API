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
    describe('updateTypeGrant', () => {
    test('deve atualizar um tipo de bolsa existente com sucesso', async () => {
      const typeGrantId = 123;

      // Mock da função existsTipoBolsa para retornar true (tipo de bolsa existe)
      mockTypeStudentGrantDALs.existsTipoBolsa = jest.fn().mockResolvedValue(true);

      // Mock da função updateTypeGrant para retornar o tipo de bolsa atualizado
      mockTypeStudentGrantDALs.updateTypeGrant = jest.fn().mockResolvedValue({ /* Seus dados de tipo de bolsa atualizados aqui */ });

      const typeGrantData = {
        id: typeGrantId,
        name: 'Novo Nome do Tipo de Bolsa',
        description: 'Nova Descrição do Tipo de Bolsa',
      };

      const result = await typeStudentGrantServices.updateTypeGrant(typeGrantData);

      // Verifica se as funções foram chamadas corretamente
      expect(mockTypeStudentGrantDALs.existsTipoBolsa).toHaveBeenCalledWith(typeGrantId);
      expect(mockTypeStudentGrantDALs.updateTypeGrant).toHaveBeenCalledWith(typeGrantData);

      // Verifica se o resultado é o tipo de bolsa atualizado
      expect(result).toEqual({ /* Seus dados de tipo de bolsa atualizados aqui */ });
    });

    test('deve lançar um erro se o tipo de bolsa não for encontrado', async () => {
      const typeGrantId = 123;

      // Mock da função existsTipoBolsa para retornar false (tipo de bolsa não encontrado)
      mockTypeStudentGrantDALs.existsTipoBolsa = jest.fn().mockResolvedValue(false);

      const typeGrantData = {
        id: typeGrantId,
        name: 'Novo Nome do Tipo de Bolsa',
        description: 'Nova Descrição do Tipo de Bolsa',
      };

      // Aguarda o lançamento de um erro
      await expect(typeStudentGrantServices.updateTypeGrant(typeGrantData)).rejects.toThrow('Type Grant not found');

      // Verifica se a função existsTipoBolsa foi chamada com o ID correto
      expect(mockTypeStudentGrantDALs.existsTipoBolsa).toHaveBeenCalledWith(typeGrantId);
    });

    
    });
});
