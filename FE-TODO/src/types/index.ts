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

export type CompletedTask = {
    id: number;
    title: string;
    time: string;
    project: string;
    projectIcon?: React.ReactNode;
    section?: string;
}

export type TaskGroup = {
    dateLabel: string;
    tasks: CompletedTask[];
}

export type ModalProps = {
    open: boolean;
    onClose: () => void;
}