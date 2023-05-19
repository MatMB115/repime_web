import ClienteOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
	title: 'RepiME',
	description: 'Find your new home',
}


export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={nunito.className}>
				<ClienteOnly>
					<ToasterProvider />
					<RegisterModal />
					<Navbar />
				</ClienteOnly>
				{children}
			</body>
		</html>
	)
}
