import React from "react";
import { EvaluateBlock } from "./Components/Constructor/EvaluateBlock";
import { NumbersBlock } from "./Components/Constructor/NumbersBlock";
import { OperatorsBlock } from "./Components/Constructor/OperatorsBlock";
import { ValueBlock } from "./Components/Constructor/ValueBlock";
import { Dropzone } from "./Components/Dropzone";

export function App() {
    return (
        <div className="wrapper">
            <div className="content">
                <div className="constructor">
                    <ValueBlock value="" isDropped={true} isDraggable />
                    <OperatorsBlock isDropped={true} isDraggable />
                    <NumbersBlock isDropped={true} isDraggable />
                    <EvaluateBlock isDropped={true} isDraggable />
                </div>
                <Dropzone />
            </div>
        </div>
    );
}
