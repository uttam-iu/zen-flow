"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface META_ITEMS {
    label: string | number;
    value: string | number;
    color?: string;
}

interface SelectMenuProps {
    value?: string | number;
    label: string;
    name: string;
    items: META_ITEMS[] | [];
    onChange: (name: string, value?: string) => void;
}

export const SelectMenu = ({ label, value, items, onChange, name }: SelectMenuProps) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button style={{ height: '24px', borderStyle: 'dashed', color: 'gray', fontSize: '12px' }} variant="outline">
                {value || label}
            </Button>} />
            <DropdownMenuContent >
                <DropdownMenuGroup>
                    {items?.map((_itm, _itmInd) => <DropdownMenuCheckboxItem
                        key={_itm?.value + '_' + _itmInd}
                        checked={value?.toString() === _itm?.value?.toString()}
                        onCheckedChange={() => onChange(name, _itm?.value?.toString())}
                    >
                        {_itm?.label}
                    </DropdownMenuCheckboxItem>)}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
