export type ButtonProps<T> = {
    label: string;
    value: T;
    size?: "normal" | "large";
};

export enum BlockType {
    Value = "0",
    Operators = "1",
    Numbers = "2",
    Evaluate = "3",
}
