"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface META_ITEMS {
    label: string | number;
    value: string | number;
    bgColor?: string;
}

interface SelectMenuProps {
    value?: string | number;
    label: string;
    name: string;
    items: META_ITEMS[] | [];
    creatable?: boolean;
    onChange: (name: string, value?: string) => void;
}

export const SelectMenu = ({ label, value, items, onChange, name, creatable = false }: SelectMenuProps) => {

    return (
        <div className="py-1">
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button
                    className={'h-[24px] font-[12px]'}
                    style={value ? { background: items?.find(ec => ec?.value?.toString() === value?.toString())?.bgColor || 'lightgray' } : { borderStyle: 'dashed', color: 'gray' }}
                    variant="outline">
                    {value || `⏲ ${label}`}
                </Button>} />
                <DropdownMenuContent >
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className={'m-[2px]'}
                            onClick={() => onChange(name, '')}
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
                            className={'m-[2px]'}
                            key={_itm?.value + '_' + _itmInd}
                            onClick={() => onChange(name, _itm?.value?.toString())}
                        >
                            <div className="flex">
                                <div className="w-[20px]">
                                    {value?.toString() === _itm?.value?.toString() && '✓'}
                                </div>
                                <div
                                    className="py-[2px] px-[8px] rounded-sm cursor-pointer  font-[12px]"
                                    style={{ background: _itm.bgColor || 'lightgray' }}
                                >{_itm?.label}</div>
                            </div>
                        </DropdownMenuItem>)}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
