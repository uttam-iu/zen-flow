'use client'

import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TaskCard from './TaskCard';
import { ColumnType, TaskType } from '@/types/task.types'
import NewTask from './NewTask'
import ColumnHeader from './ColumnHeader'

interface Props {
    column: ColumnType;
    tasks: TaskType[];
    onCreateTask: (newTask: TaskType) => void;
}

export default function BoardColumn({ column, tasks, onCreateTask }: Props) {
    const taskIds = tasks.map((t) => t?.taskId)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="w-[300px] h-[600px] opacity-40 bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-xl"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={{ ...style, maxHeight: `calc(-110px + 100vh)` }}
            className="w-[300px] min-w-[300px] bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200/80 rounded-xl flex flex-col p-4"
        >
            {/* Column Header */}
            <ColumnHeader
                column={column}
                totalTasks={tasks?.length}
                attributes={attributes}
                listeners={listeners}
            />

            {/* Task List Context */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                    {tasks?.map((task) => (
                        <TaskCard key={task?.taskId} task={task} />
                    ))}
                </SortableContext>
            </div>

            <div className={tasks?.length > 0 ? 'pt-2' : ''}>
                <NewTask column={column} onCreateTask={onCreateTask} />
            </div>
        </div>
    );
}
