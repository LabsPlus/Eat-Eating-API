import { IRfidCard } from "../../../../intefaces/rfidCard.interfaces";
import { prisma } from "../../../prisma.databases";

class RfidCardDALs {

    async createRfidCard({ userId, cardNumber }: IRfidCard) {
        const result = await prisma.rfidCard.create({
            data: {
                userId,
                cardNumber,
            }
        });

        return result
    }

    async deleteByUserId(userId: number) {
        const result = await prisma.rfidCard.delete({
            where: {
                userId: userId,
            }
        });
        return result;
    }

    async deleteById(id: number) {
        
        const result = await prisma.rfidCard.delete({
            where: {
                id: id,
            }
        });
        return result;
    }

    async findRfidCardByUserId(userId: number) {
        const result = await prisma.rfidCard.findUnique({
            where: {
                userId: userId,
            }
        })

        return result;
    }

    async updateRfidCard({ userId, cardNumber }: IRfidCard) {
        const result = await prisma.rfidCard.update({
            where: { userId: userId },
            data: {
                cardNumber: cardNumber,
            }
        })
        return result;
    }

    async listAllRfidCards() {
        const result : IRfidCard [] = await prisma.rfidCard.findMany();
        return result;
    }
}

export { RfidCardDALs };