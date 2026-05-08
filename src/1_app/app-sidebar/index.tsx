import { useLogout } from '@/features/auth/model/use-logout'
import { getMeQueryOptions } from '@/entities/user/model/query-options'
import { canReadWeather } from '@/entities/user/model/rbac'
import { useTheme, useThemeActions } from '@/shared/model/theme.store'
import { Link } from '@/shared/ui/link'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar'
import { CloudSun, LogOut, Moon, Sun, User } from 'lucide-react'
import { useRouterState } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export function AppSidebar() {
  const logout = useLogout()
  const { data: user } = useQuery(getMeQueryOptions)
  const theme = useTheme()
  const { toggleTheme } = useThemeActions()
  const pathname = useRouterState({ select: state => state.location.pathname })

  return (
    <Sidebar className="border-r border-sidebar-border/70 bg-sidebar/85 backdrop-blur-xl">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium uppercase tracking-[0.16em] text-sidebar-foreground/45">
            Навигация
          </SidebarGroupLabel>
          <SidebarMenu className="gap-2 px-3">
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/user'} tooltip="Пользователь">
                <Link to="/user">
                  <User />
                  <span>Пользователь</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {user && canReadWeather(user) && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/weather'} tooltip="Погода">
                  <Link to="/weather">
                    <CloudSun />
                    <span>Погода</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="gap-2 px-3 pb-3">
          <SidebarMenuItem>
            <SidebarMenuButton
              className="border border-sidebar-border/70 bg-sidebar-accent/45"
              tooltip="Переключить тему"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
              <span>{theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Выйти" onClick={logout}>
              <LogOut />
              <span>Выйти</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
