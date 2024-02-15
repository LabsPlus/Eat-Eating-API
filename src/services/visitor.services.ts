import {VisitorDals} from '../database/repositories/user.repositories/user.dals/visitor.dals'
export class VisitorService{

    private readonly visitorsDALs: VisitorDals;

    constructor() {
        this.visitorsDALs = new VisitorDals()
    }

}

export default {VisitorService};
