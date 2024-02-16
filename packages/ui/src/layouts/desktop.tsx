import {useEffect} from 'react'

import {CmdkMenu, useCmdkOpen} from '@/components/cmdk'
import {useUmbrelTitle} from '@/hooks/use-umbrel-title'
import {DefaultCredentialsDialog} from '@/modules/app-store/app-page/default-credentials-dialog'
import {DesktopContent} from '@/modules/desktop/desktop-content'
import {DesktopContextMenu} from '@/modules/desktop/desktop-context-menu'
import {InstallFirstApp} from '@/modules/desktop/install-first-app'
import {useApps} from '@/providers/apps'
import {t} from '@/utils/i18n'

export function Desktop() {
	const {userApps, isLoading} = useApps()

	if (isLoading) {
		return null
	}

	if (userApps?.length === 0) {
		return <InstallFirstAppPage />
	}

	return <DesktopPage />
}

function InstallFirstAppPage() {
	const title = t('install-your-first-app')
	useUmbrelTitle(title)

	return <InstallFirstApp title={title} />
}

function DesktopPage() {
	useUmbrelTitle(t('desktop.title'))
	const {open, setOpen} = useCmdkOpen()

	// Prevent scrolling on the desktop because it interferes with `AppGridGradientMasking` and causes tearing effect
	useEffect(() => {
		document.documentElement.style.overflow = 'hidden'
		return () => {
			document.documentElement.style.overflow = ''
		}
	}, [])

	return (
		<>
			<DesktopContextMenu>
				<div
					className={
						// `relative` positioning keeps children above <Wallpaper /> since that element is positioned `fixed`
						'relative flex h-[100dvh] w-full flex-col items-center justify-between'
					}
				>
					<DesktopContent onSearchClick={() => setOpen(true)} />
				</div>
			</DesktopContextMenu>
			<CmdkMenu open={open} setOpen={setOpen} />
			<DefaultCredentialsDialog />
		</>
	)
}
