import { USER_TYPE } from '@/types/user.types';
import React from 'react';
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './ui/avatar';

interface AvatarGroupPropsType extends React.HTMLAttributes<HTMLDivElement> {
    users?: USER_TYPE[];
    maxItem?: number;
    className?: string;
}

const MyAvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupPropsType>(
    ({ users = [], maxItem = 3, className = '', ...props }, ref) => {
        if (!users || users.length === 0) return null;
        const visibleItem = users.slice(0, maxItem);
        const extra: number = users.length - maxItem > 0 ? users.length - maxItem : 0;

        return (
            <div ref={ref} className={className} {...props}>
                <AvatarGroup>
                    {visibleItem.map((each: USER_TYPE, pId: number) => (
                        <Avatar
                            size="sm"
                            key={`${pId}_${each?.userName}_${each?.userId}`}
                        >
                            <AvatarImage src={each?.photoUrl || ''} alt={each?.fullName?.[0]} />
                            <AvatarFallback>{each?.fullName?.[0]}</AvatarFallback>
                        </Avatar>
                    ))}
                    {extra > 0 && (
                        <AvatarGroupCount className={'w-[24px] h-[24px] text-[12px]'}>
                            +{extra}
                        </AvatarGroupCount>
                    )}
                </AvatarGroup>
            </div>
        );
    }
);

MyAvatarGroup.displayName = 'MyAvatarGroup';

export default MyAvatarGroup;