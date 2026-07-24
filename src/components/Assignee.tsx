import React, { FC } from 'react';
import MyAvatarGroup from './MyAvatarGroup';
import { USER_TYPE } from '@/types/user.types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { UserPlus } from 'lucide-react';
import USERS from '@/dummyData/users.json';

interface AssigneeProps {
    values?: (number | USER_TYPE)[];
    creatable?: boolean;
    name: string;
    onChange: (name: string, value?: any) => void;
}

const getInitialIds = (vals?: (number | USER_TYPE)[]): number[] => {
    if (!vals || !Array.isArray(vals)) return [];
    return vals
        .map((v) => (typeof v === 'object' && v !== null ? v.userId : Number(v)))
        .filter((id) => typeof id === 'number' && !isNaN(id));
};

const Assignee: FC<AssigneeProps> = ({ name, values = [], onChange }) => {
    const [selectedIds, setSelectedIds] = React.useState<number[]>(() => getInitialIds(values));
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        setSelectedIds(getInitialIds(values));
    }, [values]);

    const handleToggleUser = (userId?: number): void => {
        if (userId === undefined) {
            // Unassigned selected -> clear all selected assignees
            setSelectedIds([]);
        } else {
            setSelectedIds((prev) => {
                if (prev.includes(userId)) {
                    return prev.filter((id) => id !== userId);
                } else {
                    return [...prev, userId];
                }
            });
        }
    };

    const handleOpenChange = (isOpen: boolean): void => {
        setOpen(isOpen);
        if (!isOpen) {
            // Dropdown menu blurred / closed -> update parent formdata with selected items
            const selectedUsers = USERS.filter((user: USER_TYPE) => selectedIds.includes(user.userId));
            onChange(name, selectedUsers);
        }
    };

    const selectedUsers = React.useMemo(() => {
        return USERS.filter((user: USER_TYPE) => selectedIds.includes(user.userId));
    }, [selectedIds]);

    return (
        <div className="py-1">
            <DropdownMenu open={open} onOpenChange={handleOpenChange}>
                <DropdownMenuTrigger
                    nativeButton={false}
                    render={
                        selectedUsers.length > 0 ? (
                            <MyAvatarGroup className="ml-2 cursor-pointer" users={selectedUsers} />
                        ) : (
                            <Avatar className="w-[24px] h-[24px] cursor-pointer">
                                <AvatarFallback>
                                    <UserPlus style={{ width: '12px' }} />
                                </AvatarFallback>
                            </Avatar>
                        )
                    }
                />
                <DropdownMenuContent className="w-[300px]">
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="m-[2px] cursor-pointer"
                            closeOnClick={false}
                            onClick={() => handleToggleUser()}
                        >
                            <div className="flex items-center">
                                <div className="w-[20px] font-bold text-xs">
                                    {selectedIds.length === 0 && '✓'}
                                </div>
                                <div className="py-[2px] px-[8px] rounded-sm font-medium text-xs text-zinc-500">
                                    Unassigned
                                </div>
                            </div>
                        </DropdownMenuItem>
                        {USERS?.map((_itm: USER_TYPE, _itmInd: number) => {
                            const isSelected = selectedIds.includes(_itm.userId);
                            return (
                                <DropdownMenuItem
                                    className="m-[2px] cursor-pointer"
                                    key={_itm.userId + '_' + _itmInd}
                                    closeOnClick={false}
                                    onClick={() => handleToggleUser(_itm.userId)}
                                >
                                    <div className="flex items-center w-full">
                                        <div className="w-[20px] font-bold text-xs text-primary">
                                            {isSelected && '✓'}
                                        </div>
                                        <div className="pr-2">
                                            <Avatar size="sm">
                                                <AvatarImage src={_itm?.photoUrl || ''} alt={_itm?.fullName?.[0]} />
                                                <AvatarFallback>{_itm?.fullName?.[0]}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="font-semibold text-xs text-zinc-800 dark:text-zinc-200">
                                                {_itm?.fullName}
                                            </div>
                                            <div className="text-[11px] text-zinc-400">
                                                {_itm?.userName}
                                            </div>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Assignee;