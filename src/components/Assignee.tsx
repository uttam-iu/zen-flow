import React, { FC } from 'react';
import MyAvatarGroup from './MyAvatarGroup';
import { USER_TYPE } from '@/types/user.types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { UserPlus } from 'lucide-react';
import USERS from '@/dummyData/users.json'

interface AssigneeProps {
    values: number[] | [];
    creatable?: boolean;
    name: string;
    onChange: (name: string, value?: number[] | undefined) => void;

}

const Assignee: FC<AssigneeProps> = ({ name, values = [], onChange }) => {
    const [sValues, setIsValues] = React.useState<number[]>([...values])
    const handleOnChange = (value?: number): void => {
        let st = [...sValues];
        if (!value) st = [];
        else if (!st?.includes(value)) st.push(value);
        else
            st?.splice(st?.indexOf(value), 1)
        setIsValues(st)
        onChange(name, st)
    }

    const selectedValues = React.useMemo(() => {
        return USERS?.filter((ec: USER_TYPE) => {
            if (sValues?.includes(ec?.userId))
                return ec;
        })

    }, [sValues])

    return (
        <div className='py-1'>

            <div className="py-1">
                <DropdownMenu>
                    <DropdownMenuTrigger nativeButton={false} render={
                        selectedValues?.length > 0 ?
                            <MyAvatarGroup className='ml-2 cursor-pointer' users={selectedValues} />
                            :
                            <Avatar className={'w-[24px] h-[24px] cursor-pointer'}>
                                <AvatarFallback><UserPlus style={{ width: '12px' }} /></AvatarFallback>
                            </Avatar>


                    } />
                    <DropdownMenuContent className={'w-[300px]'}>
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                className={'m-[2px]'}
                                onClick={() => handleOnChange()}
                            >
                                <div className="flex">
                                    <div className="w-[20px]">
                                        {sValues?.length === 0 && '✓'}
                                    </div>
                                    <div
                                        className="py-[2px] px-[8px] rounded-sm cursor-pointer font-[12px]"
                                    >--</div>
                                </div>
                            </DropdownMenuItem>
                            {USERS?.map((_itm: USER_TYPE, _itmInd: number) => <DropdownMenuItem
                                className={'m-[2px] cursor-pointer'}
                                key={_itm?.userId + '_' + _itmInd}
                                onClick={() => handleOnChange(_itm?.userId)}
                            >
                                <div className="flex items-center">
                                    <div className="w-[20px]">
                                        {sValues?.includes(_itm?.userId) && '✓'}
                                    </div>
                                    <div className='pr-1'>
                                        <Avatar size='sm'
                                        >
                                            <AvatarImage src={_itm?.photoUrl || ''} alt={_itm?.fullName?.[0]} />
                                        </Avatar>
                                    </div>
                                    <div>
                                        <div

                                            className="font-bold py-[2px] rounded-sm cursor-pointer whitespace-nowrap"
                                        >{_itm?.fullName}</div>
                                        <div>{_itm?.userName}</div>

                                    </div>
                                </div>
                            </DropdownMenuItem>)}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

// const SelectAssigneeMenu = ({ value, items, onChange }: SelectAssigneeMenuProps) => {

//     return (
//         <div className="py-1">
//             <DropdownMenu>
//                 <DropdownMenuTrigger nativeButton={false} render={
//                     <Avatar
//                         className={'w-[24px] h-[24px] cursor-pointer'}
//                     >
//                         <AvatarFallback><UserPlus style={{ width: '12px' }} /></AvatarFallback>
//                     </Avatar>
//                 } />
//                 <DropdownMenuContent className={'w-[300px]'}>
//                     <DropdownMenuGroup>
//                         <DropdownMenuItem
//                             className={'m-[2px]'}
//                             onClick={() => onChange()}
//                         >
//                             <div className="flex">
//                                 <div className="w-[20px]">
//                                     {value?.toString() === '' && '✓'}
//                                 </div>
//                                 <div
//                                     className="py-[2px] px-[8px] rounded-sm cursor-pointer font-[12px]"
//                                 >--</div>
//                             </div>
//                         </DropdownMenuItem>
//                         {items?.map((_itm, _itmInd) => <DropdownMenuItem
//                             className={'m-[2px] cursor-pointer'}
//                             key={_itm?.userId + '_' + _itmInd}
//                             onClick={() => onChange(_itm)}
//                         >
//                             <div className="flex items-center">
//                                 <div className="w-[20px]">
//                                     {value?.includes(_itm?.userId) && '✓'}
//                                 </div>
//                                 <div className='pr-1'>
//                                     <Avatar size='sm'
//                                     >
//                                         <AvatarImage src={_itm?.photoUrl || ''} alt={_itm?.fullName?.[0]} />
//                                     </Avatar>
//                                 </div>
//                                 <div>
//                                     <div

//                                         className="font-bold py-[2px] rounded-sm cursor-pointer whitespace-nowrap"
//                                     >{_itm?.fullName}</div>
//                                     <div>{_itm?.userName}</div>

//                                 </div>
//                             </div>
//                         </DropdownMenuItem>)}
//                     </DropdownMenuGroup>
//                 </DropdownMenuContent>
//             </DropdownMenu>
//         </div>
//     )
// }


export default Assignee;