import { Departments001mb } from "./Departments001mb";
import { Person001mb } from "./person001mb";
import { Unitdepartmaster001mb } from "./Unitdepartmaster001mb";
import { UnitMaster001mb } from "./unitmaster001mb";

export class User001mb extends Person001mb  {
    personId?: number;
    unitdepartslNo?: number;
    dpslno?: number;
    roleid?: number;
    username?: string;
    password?: string;
    status?: string;
    email?: string;
    securityquestion?: string;
    securityanswer?: string;
    theme?: string | null;
    dpslno2?: Departments001mb;
    unitdepartslNo2?: Unitdepartmaster001mb;
}