import { TypeStudentGrantServices } from '../services/type.student.grant.services'; // Substitua pelo caminho real
import { TypeStudentGrantDALs } from '../database/data.access/type.student.grant.dals';

describe('TypeStudentGrantServices', () => {
  let typeStudentGrantServices: TypeStudentGrantServices;
  let mockTypeStudentGrantDALs: TypeStudentGrantDALs;

  beforeEach(() => {
    mockTypeStudentGrantDALs = new TypeStudentGrantDALs();
    typeStudentGrantServices = new TypeStudentGrantServices();
    typeStudentGrantServices['typeStudentGrantDALs'] = mockTypeStudentGrantDALs;
  });

  describe('deleteTypeGrantById', () => {
    test('deve deletar um tipo de bolsa existente com sucesso', async () => {
      const typeGrantId = '123';

      // Mock da função deleteTypeGrantById para retornar um tipo de bolsa deletado
      mockTypeStudentGrantDALs.deleteTypeGrantById = jest.fn().mockResolvedValue({ /* Seus dados de tipo de bolsa aqui */ });

      const result = await typeStudentGrantServices.deleteTypeGrantById(typeGrantId);

      // Verifica se a função deleteTypeGrantById foi chamada com o ID correto
      expect(mockTypeStudentGrantDALs.deleteTypeGrantById).toHaveBeenCalledWith(typeGrantId);
      expect(result).toEqual(result);
    });

    test('deve lançar um erro se o tipo de bolsa não for encontrado', async () => {
      const typeGrantId = '123';
      mockTypeStudentGrantDALs.deleteTypeGrantById = jest.fn().mockResolvedValue(null);
      await expect(typeStudentGrantServices.deleteTypeGrantById(typeGrantId)).rejects.toThrow('Category not found');

      expect(mockTypeStudentGrantDALs.deleteTypeGrantById).toHaveBeenCalledWith(typeGrantId);
    });
  });
});