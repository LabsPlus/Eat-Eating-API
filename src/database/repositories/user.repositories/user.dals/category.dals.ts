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
}

export {CategoryDALs};
