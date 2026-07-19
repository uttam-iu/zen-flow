import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ColumnType, TaskType } from '@/types/task.types';
import { Plus } from 'lucide-react';
import React, { FC } from 'react';
import { useAppState } from '@/context/AppContext';

interface NewTaskProps {
    onCreateTask: (task: TaskType) => void;
    column: ColumnType,
    task?: TaskType,
}

const getInitialValue = (column: ColumnType, task?: TaskType) => {
    return {
        taskId: task?.taskId || '',
        taskTitle: task?.taskTitle || '',
        taskDescription: task?.taskDescription || '',
        priorityType: task?.priorityType || '',
        taskType: task?.taskType || '',
        taskStatus: task?.taskStatus || 'Pending',
        columnId: column?.id || '',
        createdAt: task?.createdAt || "",
        createdBy: task?.createdBy || null,
        updatedAt: task?.updatedAt || "",
        updatedBy: task?.updatedBy || null,
        assignee: task?.assignee || [],
        dueDate: task?.dueDate || ''
    }
}

const NewTask: FC<NewTaskProps> = ({ onCreateTask, column, task }) => {
    const ctx = useAppState()

    const [formData, setFormData] = React.useState<TaskType>(getInitialValue(column, task));
    const [showCreateBtn, setShowCreateBtn] = React.useState<boolean>(true);

    const handleOnChange = (_name: string, _value?: string): void => {
        setFormData(prevState => {
            return {
                ...prevState,
                [_name]: _value,
            }
        })
    };

    const handleAddTask = (): void => {
        setShowCreateBtn(true);
        const fData = { ...formData }
        if (!fData?.taskTitle?.trim()) return;
        onCreateTask({
            ...fData,
            taskId: task?.taskId || `task-${Date.now()}`,
            createdBy: task?.createdBy || ctx?.state?.user || null,
            createdAt: task?.createdAt || new Date()?.toDateString(),
            updatedBy: task?.updatedBy || ctx?.state?.user || null,
            updatedAt: new Date()?.toDateString(),
        });
        setFormData(getInitialValue(column));
    };

    return (
        <div className="border-t border-zinc-100 flex flex-col gap-2">
            {showCreateBtn ?
                <Button
                    onClick={() => setShowCreateBtn(false)}
                    size="sm"
                    variant="secondary"
                    className="w-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 h-8 text-xs font-medium"
                >
                    <Plus size={14} className="mr-1" /> Add Task
                </Button>
                :
                <div
                    className="p-1 w-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-medium"
                >
                    <Input
                        placeholder="New task title..."
                        value={formData?.taskTitle}
                        onChange={(e) => handleOnChange('taskTitle', e?.target?.value || '')}
                        className="bg-white border-zinc-200 h-9 text-xs"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                        onBlur={handleAddTask}
                        autoFocus
                    />
                </div>
            }
        </div>
    );
};

export default NewTask;