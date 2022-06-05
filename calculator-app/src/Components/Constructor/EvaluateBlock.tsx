import cn from "classnames";
import React, { useEffect, useState } from "react";
import { BlockType } from "../../types";

type Props = {
    isDropped: boolean;
    isDraggable?: boolean;
    isCurrentDrag?: boolean;
};

export const EvaluateBlock: React.FC<Props> = ({
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
            className={cn("container__evaluate", {
                "container": shouldShow,
                "drag__zone": isCurrentDrag,
            })}
            draggable={isDraggable}
            onDragStart={(e) => {
                e.dataTransfer.setData(BlockType.Evaluate, BlockType.Evaluate);
            }}
        >
            {shouldShow && <button className="evaluate">=</button>}
        </div>
    );
};
