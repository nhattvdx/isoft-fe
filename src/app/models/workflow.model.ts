export interface WorkflowModel {
    id?: number;
    name?: string;
    activity?: string;
    deadLine?: Date | string;
    deadLineConverted?: number;
    cratedPerson?: string;
    responsiblePerson?: UserAvatarModel[];
    project?: number;
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
    createPersons?: UserAvatarModel[];
    joinedPersons?: UserAvatarModel[];
    viewedPersons?: UserAvatarModel[];
    content?: string
    department?: number
}

export interface UserAvatarModel {
    fullName?: string,
    avatar?: string
}
