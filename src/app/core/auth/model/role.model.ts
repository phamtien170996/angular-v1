import { BaseModel } from '../../_base/crud/models/_base.model';

export class Role extends BaseModel {
    id: number;
    title: string;
    permissions: number[];
    isCoreRole: boolean = false;

    clear(): void {
        this.id = undefined;
        this.title = '';
        this.permissions = [];
        this.isCoreRole = false;
	}
}
