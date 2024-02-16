import {Student} from "@prisma/client";
import {prisma} from "../../../prisma.databases";
import {IStudentCreate} from "../../../../intefaces/student.interfaces";

class StudentDALs {

    async createStudent({userId, enrollment}: IStudentCreate) {
        const result = await prisma.student.create({
            data: {
                userId,
                enrollment
            }
        });

        return result
    }
}

export {StudentDALs}
