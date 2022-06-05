import { useState } from "react";
import { uniq } from "lodash";

type UseArray = <T>(
    defaultValue: Array<T>
) => [
    T[],
    (value: T) => void,
    (index: number) => void,
    (array: T[]) => void,
    (value: T) => void
];

export const useArray: UseArray = <T>(defaultValue: Array<T> = []) => {
    const [arrayValue, setArrayValue] = useState(defaultValue);

    const addValue = (arrValue: T) => setArrayValue([...arrayValue, arrValue]);
    const removeByIndex = (neededIndex: number) =>
        setArrayValue(
            arrayValue.filter((item, index) => index !== neededIndex)
        );
    const setArray = (newArray: Array<T>) => setArrayValue(newArray);
    const addUniqValue = (arrValue: T) =>
        setArrayValue(uniq([...arrayValue, arrValue]));

    return [arrayValue, addValue, removeByIndex, setArray, addUniqValue];
};
