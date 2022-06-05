import React, { useEffect, useState } from "react";
import { BlockType, ButtonProps } from "../../types";
import cn from "classnames";

type Props = {
    isDropped: boolean;
    isDraggable?: boolean;
    isCurrentDrag?: boolean;
};

enum Operators {
    Division,
    Multiplication,
    Addition,
    Substraction,
}

const OPERATOR_LABELS: ButtonProps<Operators>[] = [
    { label: "/", value: Operators.Division },
    { label: "*", value: Operators.Multiplication },
    { label: "+", value: Operators.Addition },
    { label: "-", value: Operators.Substraction },
];

export const OperatorsBlock: React.FC<Props> = ({
    isDropped,
    isDraggable,
    isCurrentDrag,
}) => {
    const [shouldShow, setShouldShow] = useState<boolean>(isDropped);

    useEffect(() => {
        setShouldShow(isDropped);
    }, [isDropped]);

    return (
        <div
            className={cn("container__operator", {
                "container": shouldShow,
                "drag__zone": isCurrentDrag,
            })}
            draggable={isDraggable}
            onDragStart={(e) => {
                e.dataTransfer.setData(BlockType.Operators, BlockType.Operators);
            }}
        >
            {shouldShow &&
                OPERATOR_LABELS.map(({ label, value }) => (
                    <button key={value} className="btn btn__operator">
                        {label}
                    </button>
                ))}
        </div>
    );
};
