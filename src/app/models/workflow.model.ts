export interface WorkflowModel {
    id?: number;
    name?: string;
    activity?: string;
    deadLine?: Date | string;
    deadLineConverted?: number;
    cratedPerson?: string;
    responsiblePerson?: UserAvatarModel[];
    project?: string;
    tag?: string;
    userCreated?: number;
    viewer?: number;
    isChoose?: boolean | undefined;
    status?: number;
    actualHours?: number;
    colorCode?: string;
    createdDate?: Date;
    dueDate?: Date;
    responsibleUserCreated?: UserAvatarModel;
    dueDateMode?: string;
}

export interface UserAvatarModel {
    fullName?: string,
    avatar?: string
}
