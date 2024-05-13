export interface IUserTicketCountCreate{
    userId: number;
    totalTicketsOfUser: number;    
    totalTicketsOfUserActive: number;
}
export interface IUserTicketCountUpdate{
    userId: number;
    totalTicketsOfUser: number;    
    totalTicketsOfUserActive: number;
}
export interface IUserTicketCountFind{
    userTicketsCountId: number;
    quantity: number;
}