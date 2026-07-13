import { USER_TYPE } from '@/types/user.types';
import React, { FC } from 'react';
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './ui/avatar';

interface AvatarGroupPropsType {
    users: USER_TYPE[] | [];
    maxItem?: number;
    className?: string;
}

const MyAvatarGroup: FC<AvatarGroupPropsType> = ({ users = [], maxItem = 3, className = '' }) => {
    if (users?.length === 0) return ''
    const visibleItem = users?.slice(0, maxItem);
    const extra: number = (users || [])?.length - maxItem > 0 ? (users || [])?.length - maxItem : 0;

    return (
        <div className={className}>
            <AvatarGroup
            // className="grayscale"
            >
                {visibleItem?.map((each: USER_TYPE, pId: number) => (<Avatar key={`${pId}_${each?.userName}_${pId}_${each?.userId}`}>
                    <AvatarImage src={each?.photoUrl || ''} alt={each?.fullName?.[0]} />
                    <AvatarFallback>{each?.fullName?.[0]}</AvatarFallback>
                </Avatar>))}
                {extra > 0 && <AvatarGroupCount>+3</AvatarGroupCount>}
            </AvatarGroup>
        </div>
    )
};

export default MyAvatarGroup;