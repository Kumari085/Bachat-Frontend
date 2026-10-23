import { useState } from 'react'
import { HandCoins, Settings, LayoutGridCircles, ArrowLeftRight, Goal, ChartNoAxesCombined, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [isFolded, setIsFolded] = useState(false)

  return (
    <div className={`flex h-screen shrink-0 flex-col bg-[#0F1F1A] text-[#F5F5F5] transition-[width] duration-200 ${isFolded ? 'w-16 p-3' : 'w-60 p-6'}`}>
        <div className={`flex items-center ${isFolded ? 'flex-col gap-4' : 'justify-between gap-3'}`}>
          <div className='flex items-center gap-3'>
            <HandCoins size={25} strokeWidth={1.25} />
            {!isFolded && <h1 className='text-2xl'>Bachat</h1>}
          </div>
          <button
            type='button'
            onClick={() => setIsFolded(!isFolded)}
            aria-label={isFolded ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isFolded}
            title={isFolded ? 'Expand sidebar' : 'Collapse sidebar'}
            className='rounded p-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white'
          >
            {isFolded ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className='mt-5 flex flex-col gap-2'>
            <Link to='/' title={isFolded ? 'Dashboard' : undefined} aria-label='Dashboard' className={`flex items-center gap-2 rounded py-1 hover:bg-white/10 ${isFolded ? 'justify-center' : ''}`}><LayoutGridCircles size={16} strokeWidth={1} />{!isFolded && 'Dashboard'}</Link>
            <Link to='/transaction' title={isFolded ? 'Transactions' : undefined} aria-label='Transactions' className={`flex items-center gap-2 rounded py-1 hover:bg-white/10 ${isFolded ? 'justify-center' : ''}`}><ArrowLeftRight size={16} strokeWidth={1} />{!isFolded && 'Transactions'}</Link>
            <Link to='/goal' title={isFolded ? 'Goals' : undefined} aria-label='Goals' className={`flex items-center gap-2 rounded py-1 hover:bg-white/10 ${isFolded ? 'justify-center' : ''}`}><Goal size={16} strokeWidth={1} />{!isFolded && 'Goals'}</Link>
            <Link to='/report' title={isFolded ? 'Reports' : undefined} aria-label='Reports' className={`flex items-center gap-2 rounded py-1 hover:bg-white/10 ${isFolded ? 'justify-center' : ''}`}><ChartNoAxesCombined size={16} strokeWidth={1} />{!isFolded && 'Reports'}</Link>
        </nav>

        {!isFolded && <h1 className='mt-4 overflow-hidden whitespace-nowrap'>_____________________________</h1>}

       <div className='mt-3 flex flex-col'>
        <Link to='/setting' title={isFolded ? 'Settings' : undefined} aria-label='Settings' className={`flex items-center gap-2 rounded py-1 hover:bg-white/10 ${isFolded ? 'justify-center' : ''}`}><Settings size={16} strokeWidth={1} />{!isFolded && 'Settings'}</Link>
       </div>
        
    </div>
  )
}

export default Sidebar