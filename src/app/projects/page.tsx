import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Edit, Loader } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { PROJECT_TYPE } from '@/types/project.types';
import MyAvatarGroup from '@/components/MyAvatarGroup';
import { getProjects } from '@/dummyData/projects';

export default function Page() {
    const projects: PROJECT_TYPE[] = getProjects();

    return (
        <div >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projects?.map((pro: PROJECT_TYPE, proInd: number) => <Link href={`/projects/${pro?.projectId}`} key={`${proInd}+${pro?.projectId}_${pro?.projectName}`}>
                    <Card className="shadow-sm border-gray-100 md:col-span-2 lg:col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-md text-teal-500">{pro?.projectName}</CardTitle>
                            <Edit className="w-4 h-4 text-teal-500" />
                        </CardHeader>
                        <CardContent>
                            {pro?.isClosed ? <Badge style={{ color: 'green' }} variant="outline">
                                <Check data-icon="inline-start" />
                                Done
                            </Badge> : <Badge style={{ color: 'orange' }} variant="outline">
                                <Loader data-icon="inline-start" />
                                In Progress
                            </Badge>}
                            <p className="text-xs text-green-500">All systems operational</p>
                        </CardContent>
                        <CardFooter>
                            <MyAvatarGroup users={pro?.participants || []} />
                        </CardFooter>
                    </Card>
                </Link>)}
            </div>
        </div>
    );
}
