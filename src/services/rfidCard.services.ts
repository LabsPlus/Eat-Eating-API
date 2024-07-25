import { BadRequestError, NotFoundError, UnprocessedEntityError, } from '../helpers/errors.helpers';
import { hash } from 'bcrypt';
import { RfidCardDALs } from '../database/repositories/user.repositories/user.dals/rfidCard.dals';
import { IRfidCard } from '../intefaces/rfidCard.interfaces';
import dotenv from 'dotenv';

dotenv.config();

class RfidCardServices {

    rfidCardDALs: RfidCardDALs;

    constructor() {
        this.rfidCardDALs = new RfidCardDALs();
    }

    async generateRfidCardNumber(): Promise<{}> {
        const cardNumberLength = 100000000000000000000;
        const cardNumber = Math.floor(Math.random() * cardNumberLength).toString();

        if (!cardNumber) {
            throw new UnprocessedEntityError({
                message: 'Card number is required',
            });
        }

        if (cardNumber.length != 20) {
            
            this.generateRfidCardNumber();

        }

        this.rfidCardDALs.listAllRfidCards().then((listOfAllRfidCards) => {
            const cardNumberExist = listOfAllRfidCards.find((card) => card.cardNumber === cardNumber);

            if (cardNumberExist) {
                this.generateRfidCardNumber();
            }

        });

        return {
            cardNumber: cardNumber
        };

    }

}

export { RfidCardServices };