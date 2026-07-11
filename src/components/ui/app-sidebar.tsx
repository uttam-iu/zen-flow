'use client'

import * as React from "react"
import {
    Bot,
    BookOpen,
    Settings2,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

import logoIcon from '../../../public/logo.png';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    return (
        <Sidebar collapsible="icon" className="border-r border-gray-100" {...props}>
            {/* Header: Acme Inc */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-white">
                                <Image alt='Z' height={40} width={40} src={logoIcon} className="object-contain" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <div className='px-1 text-[24px] cursor-pointer text-teal-800 font-extrabold'>ZenFlow</div>
                            </div>
                            {/* <ChevronsUpDown className="ml-auto size-4 text-gray-400" /> */}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Content Body */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Platform
                    </SidebarGroupLabel>
                    <SidebarMenu>

                        {/* 2. Models */}
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Models">
                                <Bot className="size-4 text-gray-700" />
                                <span>Models</span>
                                {/* <ChevronsUpDown className="ml-auto size-4 text-gray-400" /> */}
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {/* 3. Documentation */}
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Documentation">
                                <BookOpen className="size-4 text-gray-700" />
                                <span>Documentation</span>
                                {/* <ChevronsUpDown className="ml-auto size-4 text-gray-400" /> */}
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {/* 4. Settings */}
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Settings">
                                <Settings2 className="size-4 text-gray-700" />
                                <span>Settings</span>
                                {/* <ChevronsUpDown className="ml-auto size-4 text-gray-400" /> */}
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer: User Profile */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src="https://github.com" alt="UK" />
                                <AvatarFallback className="rounded-lg">UK</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Uttam Kumar</span>
                                <span className="truncate text-xs text-gray-500">u@k.com</span>
                            </div>
                            {/* <ChevronsUpDown className="ml-auto size-4 text-gray-400" /> */}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
