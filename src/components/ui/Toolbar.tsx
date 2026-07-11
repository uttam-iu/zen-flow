'use client'
import { LogOutIcon, SquareUser, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './dropdown-menu';
import { Button } from './button';


export default function Toolbar({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const onLogout = (): void => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    window.location.reload()
  }

  return (<>
    <div className="w-full h-[48px]  sticky top-0 z-index-9 border-b-1 border-[lightgray]">
      <div className='p-1 h-full flex justify-between items-center'>
        <div className='flex gap-2'>
          <div
            className='flex items-center cursor-pointer text-teal-800'
          >
            {children}
          </div>
          <div>breadcrumb</div>
        </div>
        <div className='flex gap-2'>
          {/* <div className='flex items-center cursor-pointer text-teal-800 hover:scale-[1.25]'><Bell /></div> */}
          <div className='flex items-center cursor-pointer text-teal-800' >
            <DropdownMenu>
              <DropdownMenuTrigger className={'cursor-pointer'} render={<Button variant="outline" />}>
                <SquareUser />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Uttam Kumar</DropdownMenuLabel>
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
    </div>
  </>
  );
}
