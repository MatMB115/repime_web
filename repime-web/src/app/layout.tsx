import ClienteOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

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
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
				</ClienteOnly>
				{children}
			</body>
		</html>
	)
}
