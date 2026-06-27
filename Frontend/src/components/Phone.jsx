/* Reusable iPhone-style shell */
export default function Phone({ children, className = '' }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-notch" />
      <div className="phone-screen">
        {children}
      </div>
    </div>
  )
}
