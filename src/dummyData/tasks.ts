export const columnData = [
        { id: 1, title: 'To Do' },
        { id: 2, title: 'In Progress' },
]


export const taskData = [
    {
        taskId: 1,
        taskTitle: 'Create Shadcn components',
        taskDescription: 'Test Description',
        priorityType: 'Urgent',
        taskType: 'Feature',
        taskStatus:'Pending',
        columnId: 1,
        createdAt: "2026-07-12 11:30",
        createdBy: {
            userId: 2,
            userName: "sagor@k.com",
            fullName: "Assaduzzaman Sagor",
            photoUrl: "https://github.com/maxleiter.png"
        },
        assignee:[
             {
                userId: 1,
                userName: "uttam@k.com",
                fullName: "Uttam Kumar",
                photoUrl: "https://github.com/shadcn.png"
            },
        ],
        dueDate: "2026-07-12 11:30",
        // subtasks:[],
        // attachments:[],
        // comments:[]
        
    },
    {
        taskId: 2,
        taskTitle: 'Integrate dnd-kit context',
        taskDescription: 'Test Description',
        priorityType: 'Urgent',
        taskType: 'Feature',
        taskStatus:'Pending',
        columnId: 2,
        createdAt: "2026-07-12 11:30",
        createdBy: {
            userId: 1,
            userName: "uttam@k.com",
            fullName: "Uttam Kumar",
            photoUrl: "https://github.com/shadcn.png"
        },
        assignee:[
             {
                userId: 2,
                userName: "sagor@k.com",
                fullName: "Assaduzzaman Sagor",
                photoUrl: "https://github.com/maxleiter.png"
            },
        ],
        dueDate: "2026-07-12 11:30",
        // subtasks:[],
        // attachments:[],
        // comments:[]
        
    }
]