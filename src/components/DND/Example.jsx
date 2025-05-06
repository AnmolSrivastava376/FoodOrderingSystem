'use client'
import React, { useState } from 'react';
import { closestCorners, DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

export function Example() {
    const [parent, setParent] = useState(null);
    const [isClient, setIsClient] = useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const draggable = (
        <Draggable id="draggable">
            Go ahead, drag me.
        </Draggable>
    );

    const pointerSensor = useSensor(PointerSensor);
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            tolerance: 5,
            delay: 10,
        },
    });

    const sensor = useSensors(pointerSensor, touchSensor);

    if (!isClient) {
        return null; // Prevent rendering on the server
    }

    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensor} collisionDetection={closestCorners}>
            {!parent ? draggable : null}
            <Droppable id="droppable">
                {parent === "droppable" ? draggable : 'Drop here'}
            </Droppable>
        </DndContext>
    );

    function handleDragEnd({ over }) {
        setParent(over ? over.id : null);
    }
}
