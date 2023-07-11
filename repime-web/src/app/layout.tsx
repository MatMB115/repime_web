import ClienteOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import SearchModal from './components/modals/SearchModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
	title: 'RepiME',
	description: 'Find your new home',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={nunito.className}>
				<ClienteOnly>
					<ToasterProvider />
					<SearchModal />
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
				</ClienteOnly>
				<div className="pb-20 pt-28">
          			{children}
        		</div>
			</body>
		</html>
	)
}
