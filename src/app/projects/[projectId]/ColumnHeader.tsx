import { ColumnType } from '@/types/task.types';
import { GripHorizontal } from 'lucide-react';
import React, { FC } from 'react';

interface ColumnHeaderProps {
    column: ColumnType;
    totalTasks: number;
    attributes: any;
    listeners: any;
}

const ColumnHeader: FC<ColumnHeaderProps> = ({ column, totalTasks, attributes, listeners }) => {
    return (
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-100">
            <div className="flex items-center gap-2">
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing text-zinc-400 hover:text-zinc-600"
                >
                    <GripHorizontal size={18} />
                </button>
                <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm tracking-tight">
                    {column?.title}
                </h3>
            </div>
            <span className="text-xs bg-zinc-200/60 dark:bg-zinc-800 px-2 py-0.5 rounded-full font-medium text-zinc-600">
                {totalTasks}
            </span>
        </div>
    );
};

export default ColumnHeader;