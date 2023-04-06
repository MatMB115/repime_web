export default function IndexPage() {
    return (
        <div>
			<header className='p-4 flex justify-between'>
				<a href="" className="flex items-center gap-1">
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40">
						<image width="40" height="40" xlinkHref="data:image/png;base64,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"></image>
					</svg>
					<span className='font-bold text-xl'>RepiME</span>
				</a>
				<div className='flex items-center gap-4 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
					<div>Pesquise uma vaga</div>
					<button className='bg-primary text-white p-2 rounded-full'>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
						</svg>
					</button>
				</div>
				<div className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4'>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
					<div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
							<path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
						</svg>

					</div>
				</div>
			</header>
		</div>
    )
}