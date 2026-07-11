import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EACH_PROJECT from '../dummyData/projects.json';
import { Activity, Check, CreditCard, Edit, Loader, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';


const getProjects = () => {
  const _p = [];
  for (let i = 0; i < 10; i += 1) {
    const ec = { ...EACH_PROJECT };
    ec.projectId = i + 1;
    ec.projectName = EACH_PROJECT?.projectName + '_' + (i + 1);
    _p.push(ec);
  }
  return _p;
}

export default function Home() {

  const projects = getProjects()
  console.log(projects)
  return (
    <div >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((pro, proInd) => <div key={`${proInd}+${pro?.projectId}_${pro?.projectName}`}>
          <Card className="shadow-sm border-gray-100 md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl text-teal-500">{pro?.projectName}</CardTitle>
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
              <AvatarGroup
              // className="grayscale"
              >
                {pro?.participants?.map((each, pId) => (<Avatar key={`${proInd}+${pro?.projectId}_${pro?.projectName}_${pId}_${each?.userId}`}>
                  <AvatarImage src={each?.photoUrl} alt={each?.fullName?.[0]} />
                  <AvatarFallback>{each?.fullName?.[0]}</AvatarFallback>
                </Avatar>))}
                <AvatarGroupCount>+3</AvatarGroupCount>
              </AvatarGroup>
            </CardFooter>
          </Card>
        </div>)}
      </div>
    </div>
  );
}
