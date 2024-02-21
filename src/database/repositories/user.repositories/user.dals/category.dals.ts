import {prisma} from "../../../prisma.databases";
import {CategoryName} from "@prisma/client";

class CategoryDALs {
    async getCategoryByName(name: CategoryName) {
        const result = await prisma.category.findUnique({
            where: {
                name
            }
        })
        return result;
    }
    async getCategoryById(id: number ){
        const result = await prisma.category.findUnique({
            where:{
                id
            }
        });
        return result;
    }
}

export {CategoryDALs};
