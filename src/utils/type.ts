export interface Form {
    title: string,
    description: string
    category: string
}

export interface SortType {
    sortBy: string;
    category: string
}
export interface ActionModal {
    complete: boolean;
    edit: boolean;
    delete: boolean;
}

export interface List {
    id: number
    title: string
    description: string
    category: string
    completed: boolean;
}

export interface ListSliceType {
    list: List[]
    sortCategory: string
}

export interface ModalType {
    isOpen: boolean
}