export type Task = {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    completed: boolean;
}

export type FilterItem = {
    name: string;
    usedCount?: number;
}

export type LabelItem = {
    name: string;
    color?: string;
}
