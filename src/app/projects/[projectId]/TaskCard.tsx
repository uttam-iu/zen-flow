'use client'

import MyAvatarGroup from '@/components/MyAvatarGroup';
import { TaskType } from '@/types/task.types';
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

interface Props {
    task: TaskType;
    isOverlay?: boolean;
}

export default function TaskCard({ task, isOverlay }: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task?.taskId,
        data: {
            type: 'Task',
            task,
        },
        disabled: isOverlay,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isOverlay) {
        return (
            <div className="bg-white dark:bg-zinc-950 p-4 rounded-lg border border-zinc-300 shadow-xl flex items-center gap-2 cursor-grabbing ring-1 ring-zinc-400/20">
                <div className="text-zinc-500">
                    <GripVertical size={16} />
                </div>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 flex-1">
                    {task?.taskTitle}
                </span>
                {task?.assignee && task.assignee.length > 0 && (
                    <MyAvatarGroup users={task.assignee} maxItem={2} className="ml-auto shrink-0" />
                )}
            </div>
        );
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-30 bg-zinc-100 dark:bg-zinc-800 p-4 min-h-[60px] rounded-lg border border-dashed border-zinc-300"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white dark:bg-zinc-950 p-4 rounded-lg border border-zinc-200 shadow-sm flex items-center gap-2 group hover:border-zinc-400 transition-colors"
        >
            <button
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-zinc-400 hover:text-zinc-600 transition-colors"
            >
                <GripVertical size={16} />
            </button>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex-1">
                {task?.taskTitle}
            </span>
            {task?.assignee && task.assignee.length > 0 && (
                <MyAvatarGroup users={task.assignee} maxItem={2} className="ml-auto shrink-0" />
            )}
        </div>
    );
}
