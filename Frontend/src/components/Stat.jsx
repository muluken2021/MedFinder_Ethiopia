import React from 'react'



const stats = [
  { value: '1,200+', label: 'Verified Pharmacies' },
  { value: '50k+', label: 'Medicines Listed' },
  { value: '24/7', label: 'Real-time Updates' },
];

const Stat = () => {
    
  return (
    <div className='bg-brand-500 p-10'>
       {/* Stats */}
        <div className="flex gap-10 items-center pt-4 ">
        {stats.map((s) => (
            <div key={s.label}>
            <p className="text-4xl font-bold text-brand-100">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Stat
