export interface IUserCreate {
    name: string;
    matricula: string;
    categoriaId?: number;
    tipoDeBolsaId?: number;
    refeicoesDiarias:  number;
}