'use client'

import React, { useState } from 'react'
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { ColumnType, TaskType } from '@/types/task.types'
import BoardColumn from '@/components/BoardColumn'
import TaskCard from '@/components/TaskCard'
import { useSidebar } from '@/components/ui/sidebar'
import { useAppState } from '@/context/AppContext'
import { getProjects } from '@/dummyData/projects'
import { PROJECT_TYPE } from '@/types/project.types'
import { useParams } from 'next/navigation'

export default function KanbanBoard() {
    const projects: PROJECT_TYPE[] = getProjects()


    const { projectId } = useParams()

    React.useEffect(() => {
        const mainContentElem = document.getElementById('main-content');
        if (mainContentElem) mainContentElem.style.overflow = 'hidden'
    }, [])

    const { open, isMobile } = useSidebar()

    const ctx = useAppState()

    React.useEffect(() => {
        const project = projects?.find(ec => ec?.projectId?.toString() === projectId?.toString())
        if (project) ctx?.setProject?.(project)
    }, [projectId])

    // Dynamic dynamic width calculate structure based on state
    const getMaxWidthClass = () => {
        if (isMobile) return "max-w-full"
        return open ? "max-w-[calc(100vw-266px)]" : "max-w-[calc(100vw-58px)]"
        // Note: 256px layout config setup configuration mapping runtime dependency setup checks
    }

    const [columns, setColumns] = useState<ColumnType[]>([
        { id: 'todo', title: 'To Do' },
        { id: 'progress', title: 'In Progress' },
    ])
    const [tasks, setTasks] = useState<TaskType[]>([
        { id: '1', columnId: 'todo', content: 'Create Shadcn components' },
        { id: '2', columnId: 'todo', content: 'Integrate dnd-kit context' },
    ])

    const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null)
    const [activeTask, setActiveTask] = useState<TaskType | null>(null)
    const [newBoardTitle, setNewBoardTitle] = useState('')

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 }, // prevents click conflicts
        })
    )

    // Handlers to Create Column / Tasks
    const handleCreateColumn = () => {
        if (!newBoardTitle.trim()) return
        const id = `col-${Date.now()}`
        setColumns([...columns, { id, title: newBoardTitle }])
        setNewBoardTitle('')
    }

    const handleCreateTask = (columnId: string, content: string) => {
        const newTask: TaskType = { id: `task-${Date.now()}`, columnId, content }
        setTasks([...tasks, newTask])
    }

    // Drag Handlers
    function handleDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Column') {
            setActiveColumn(event.active.data.current.column)
            return
        }
        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task)
        }
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveATask = active.data.current?.type === 'Task'
        const isOverATask = over.data.current?.type === 'Task'

        if (!isActiveATask) return

        // Task over Task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId)
                const overIndex = tasks.findIndex((t) => t.id === overId)

                if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                    tasks[activeIndex].columnId = tasks[overIndex].columnId
                    return arrayMove(tasks, activeIndex, overIndex - 1)
                }
                return arrayMove(tasks, activeIndex, overIndex)
            })
        }

        // Task over Column
        const isOverAColumn = over.data.current?.type === 'Column'
        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId)
                tasks[activeIndex].columnId = overId.toString()
                return arrayMove(tasks, activeIndex, activeIndex)
            })
        }
    }

    function handleDragEnd(event: DragEndEvent) {
        setActiveColumn(null)
        setActiveTask(null)

        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveAColumn = active.data.current?.type === 'Column'
        if (!isActiveAColumn) return

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeId)
            const overColumnIndex = columns.findIndex((col) => col.id === overId)
            return arrayMove(columns, activeColumnIndex, overColumnIndex)
        })
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans select-none">
            {/* Header controls */}
            <div className="border-b border-zinc-100">
                <div className="flex items-center gap-2 pb-1">
                    <Input
                        placeholder="New Column Title"
                        value={newBoardTitle}
                        onChange={(e) => setNewBoardTitle(e.target.value)}
                        className="w-full sm:w-64 h-9 text-sm border-zinc-200 shadow-none bg-zinc-50/50"
                        onKeyDown={(e) => e.key === 'Enter' && handleCreateColumn()}
                    />
                    <Button onClick={handleCreateColumn} size="sm" className="bg-zinc-900 text-white hover:bg-zinc-800 text-xs shrink-0 h-9 font-medium px-4">
                        <Plus size={15} className="mr-1" /> New Board
                    </Button>
                </div>
            </div>

            {/* Main Drag Canvas Context */}
            <div className={`flex-1 flex gap-6 items-start overflow-x-auto pt-1 custom-scrollbar ${getMaxWidthClass()}`}>
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={columns.map((c) => c.id)} strategy={horizontalListSortingStrategy}>
                        {columns.map((col) => (
                            <BoardColumn
                                key={col.id}
                                column={col}
                                tasks={tasks.filter((t) => t.columnId === col.id)}
                                onCreateTask={handleCreateTask}
                            />
                        ))}
                    </SortableContext>

                    {/* Smooth Floating Overlay Portal */}
                    {typeof window !== 'undefined' &&
                        createPortal(
                            <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)' }}>
                                {activeColumn && (
                                    <BoardColumn
                                        column={activeColumn}
                                        tasks={tasks.filter((t) => t.columnId === activeColumn.id)}
                                        onCreateTask={handleCreateTask}
                                    />
                                )}
                                {activeTask && <TaskCard task={activeTask} />}
                            </DragOverlay>,
                            document.body
                        )}
                </DndContext>
            </div>
        </div>
    )
}
