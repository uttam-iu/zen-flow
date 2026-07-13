'use client'
import { LogOutIcon, SquareUser, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './dropdown-menu';
import { Button } from './button';
import { useAppState } from '@/context/AppContext';
import React from 'react';
import Dummy_Uers from "@/dummyData/users.json";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar';
import MyAvatarGroup from '../MyAvatarGroup';

export default function Toolbar({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const ctx = useAppState()
	React.useEffect(() => {
		console.log(document.cookie)
		const cookies = new URLSearchParams(document.cookie.replaceAll('; ', '&'));
		const userId = cookies?.get('user') || '';
		const userIndb = Dummy_Uers?.find(ec => ec?.userId?.toString() === userId?.toString()) || null;
		if (userId && userIndb)
			ctx?.setUser?.(userIndb)
		else window.location.replace('/login');
	}, [])

	const onLogout = (): void => {
		localStorage.removeItem('user')
		document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
		window.location.reload()
	};

	return (<>
		<div className="w-full h-[48px]  sticky top-0 z-index-9 border-b-1 border-[lightgray]">
			<div className='p-1 h-full flex justify-between items-center'>
				<div className='flex gap-2'>
					<div
						className='flex items-center cursor-pointer text-teal-800'
					>
						<div>{children}</div>
						<MyAvatarGroup className='ml-2' users={ctx?.state?.project?.participants || []} />
					</div>
					{/* <div>breadcrumb</div> */}
				</div>
				<div className='flex gap-2'>
					{/* <div className='flex items-center cursor-pointer text-teal-800 hover:scale-[1.25]'><Bell /></div> */}
					<div className='flex items-center cursor-pointer text-teal-800' >
						<DropdownMenu>
							<DropdownMenuTrigger className={'cursor-pointer'} render={<Button style={{ background: 'transparent' }} />}>
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={ctx?.state?.user?.photoUrl || ''} alt="UK" />
									<AvatarFallback className="rounded-lg">{ctx?.state?.user?.fullName?.[0]}</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuGroup>
									<DropdownMenuLabel>{ctx?.state?.user?.fullName}</DropdownMenuLabel>
									{/* <DropdownMenuLabel>uttam@k.com</DropdownMenuLabel> */}
									<DropdownMenuItem className={'cursor-pointer'} ><User className="h-4 w-4" />Profile</DropdownMenuItem>
									<DropdownMenuItem onClick={onLogout} className={'cursor-pointer'} >
										<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
											<LogOutIcon className="h-4 w-4" />
											Log Out
										</div>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								{/* <DropdownMenuSeparator /> */}
							</DropdownMenuContent>
						</DropdownMenu>

					</div>
				</div>

			</div>
		</div >
	</>
	);
}
