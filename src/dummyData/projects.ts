import { PROJECT_TYPE } from "@/types/project.types";

  const EACH_PROJECT: PROJECT_TYPE  = {
    "projectId": 1,
    "projectName": "Smart Campus",
    "projectDescription": "Smart Campus is a ERP solution for university management...",
    "createdAt": "2026-07-12 11:30",
    "createdBy": {
        "userId": 1,
        "userName": "u@k.com",
        "fullName": "Uttam Kumar",
        "photoUrl": "https://github.com/shadcn.png"
    },
    "participants":[
        {
            "userId": 1,
            "userName": "uttam@k.com",
            "fullName": "Uttam Kumar",
            "photoUrl": "https://github.com/shadcn.png"
        },
        {
            "userId": 2,
            "userName": "sagor@k.com",
            "fullName": "Assaduzzaman Sagor",
            "photoUrl": "https://github.com/maxleiter.png"
        },
        {
            "userId": 3,
            "userName": "shibly@k.com",
            "fullName": "Shibly Mustafiz",
            "photoUrl": "https://github.com/evilrabbit.png"
        },
        {
            "userId": 4,
            "userName": "ariful@k.com",
            "fullName": "Ariful Islam",
            "photoUrl": "https://github.com/maxleiter.png"
        },
        {
            "userId": 5,
            "userName": "junayed@k.com",
            "fullName": "Junayed Fahim",
            "photoUrl": "https://github.com/evilrabbit.png"
        }
    ],
    "isClosed": false,
    "closedAt": null
  }

export const getProjects = (): PROJECT_TYPE[] => {
  const _p = [];
  for (let i = 0; i < 10; i += 1) {
    const ec = { ...EACH_PROJECT };
    ec.projectId = i + 1;
    ec.projectName = EACH_PROJECT?.projectName + '_' + (i + 1);
    _p.push(ec);
  }
  return _p;
}

