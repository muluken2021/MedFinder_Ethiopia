import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react'

const Contact = () => {
  const { theme } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submitted:', formData)
    alert('Thank you! Your message has been sent to the MedFinder support team.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  
// Sub-component for Info Cards
const InfoCard = ({ icon, title, detail, subDetail, theme }) => (
  <div className="bg-white p-6 rounded border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{title}</h3>
      <p className="text-lg font-bold text-gray-900">{detail}</p>
      <p className="text-sm font-medium text-gray-500">{subDetail}</p>
    </div>
  </div>
)

  return (
    <div  >
  
       {/* Header Section */}
        <div className="text-center md:text-start px-6 lg:px-24 py-30 mb-16 bg-brand-700">
          <h1 className="text-4xl md:text-5xl text-gray-200 font-semibold mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-md text-gray-300 leading-relaxed font-medium">
            Have questions about finding medicine or registering your pharmacy? 
            Our support team is here to help <br /> to you navigate MedFinder Ethiopia.
          </p>
        </div>
      <div className="min-h-screen container px-6 lg:px-24">
       

        <div className="grid grid-cols-1 pb-16 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-50 rounded-2xl text-brand-600">
                  <MessageSquare size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ContactInput 
                    label="Your Name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="e.g. Dawit Isaac" 
                  />
                  <ContactInput 
                    label="Email Address" 
                    name="email" 
                    type="email"
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="dawit@example.com" 
                  />
                </div>

                <ContactInput 
                  label="Subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="How can we help?" 
                />

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent outline-none focus:border-brand-600/20 focus:bg-white transition-all font-medium text-gray-900 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 rounded-2xl bg-brand-600 text-white font-bold text-lg hover:bg-brand-700  transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Contact Information & Map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-4">
              <InfoCard 
                icon={<Mail />} 
                title="Email Us" 
                detail="support@medfinder.et" 
                subDetail="Response within 24 hours"
                theme={theme} 
              />
              <InfoCard 
                icon={<Phone />} 
                title="Call Us" 
                detail="+251 11 6XX XXXX" 
                subDetail="Mon-Fri, 8am - 6pm"
                theme={theme} 
              />
              <InfoCard 
                icon={<MapPin />} 
                title="Office" 
                detail="Bole Subcity, Addis Ababa" 
                subDetail="Ethiopia"
                theme={theme} 
              />
            </div>

            {/* Map Integration */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-brand-900/5 overflow-hidden border border-gray-100 p-2">
              <div className="h-64 rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126744.2578636027!2d38.6816232!3d9.0236488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="MedFinder Office"
                ></iframe>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">Headquarters</h4>
                  <p className="text-sm text-gray-500 font-medium">Addis Ababa, ET</p>
                </div>
                <Globe className="text-brand-100" size={40} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// Sub-component for Inputs
const ContactInput = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-gray-700 ml-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      placeholder={placeholder}
      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent outline-none focus:border-brand-600/20 focus:bg-white transition-all font-medium text-gray-900 placeholder:text-gray-400"
    />
  </div>
)


export default Contact