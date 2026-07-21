import React, { FC } from 'react';
import MyAvatarGroup from './MyAvatarGroup';
import { USER_TYPE } from '@/types/user.types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { UserPlus } from 'lucide-react';
import USERS from '@/dummyData/users.json'

interface AssigneeProps {
    users: USER_TYPE[] | [];
    creatable?: boolean;

}

interface SelectAssigneeMenuProps {
    value?: number[];
    items: USER_TYPE[] | [];
    onChange: (value?: number) => void;
}

const Assignee: FC<AssigneeProps> = ({ users = [] }) => {
    const handleOnChange = (value?: number): void => {
        console.log(value)

    }
    return (
        <div className='py-1'>
            {users?.length > 0 ?
                <MyAvatarGroup className='ml-2' users={[]} /> :
                <SelectAssigneeMenu onChange={handleOnChange} value={[]} items={USERS || []} />
            }
        </div>
    );
}

const SelectAssigneeMenu = ({ value, items, onChange }: SelectAssigneeMenuProps) => {

    return (
        <div className="py-1">
            <DropdownMenu>
                <DropdownMenuTrigger nativeButton={false} render={
                    <Avatar
                        className={'w-[24px] h-[24px] cursor-pointer'}
                    >
                        <AvatarFallback><UserPlus style={{ width: '12px' }} /></AvatarFallback>
                    </Avatar>
                } />
                <DropdownMenuContent className={'w-[300px]'}>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className={'m-[2px]'}
                            onClick={() => onChange()}
                        >
                            <div className="flex">
                                <div className="w-[20px]">
                                    {value?.toString() === '' && '✓'}
                                </div>
                                <div
                                    className="py-[2px] px-[8px] rounded-sm cursor-pointer font-[12px]"
                                >--</div>
                            </div>
                        </DropdownMenuItem>
                        {items?.map((_itm, _itmInd) => <DropdownMenuItem
                            className={'m-[2px] cursor-pointer'}
                            key={_itm?.userId + '_' + _itmInd}
                            onClick={() => onChange(_itm?.userId)}
                        >
                            <div className="flex items-center">
                                <div className="w-[20px]">
                                    {value?.includes(_itm?.userId) && '✓'}
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
    )
}


export default Assignee;