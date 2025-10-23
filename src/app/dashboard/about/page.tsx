import React from 'react'

function AboutUs() {
  return (
    <div className="overflow-y-auto max-h-[calc(100vh-250px)] p-4">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About AyuHistory</h1>

        <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            At AyuHistory, our vision is to revolutionize healthcare management through innovative technology that seamlessly integrates traditional Ayurvedic practices with modern digital solutions. We strive to empower healthcare providers with comprehensive tools that enhance patient care, streamline operations, and promote holistic wellness in the digital age.
          </p>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            AyurHealth is a comprehensive healthcare management platform designed specifically for Ayurvedic practitioners and wellness centers. Our platform combines the wisdom of ancient healing traditions with cutting-edge technology to deliver unparalleled healthcare solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Patient Management</h3>
                <p className="text-gray-600">Comprehensive patient records and treatment history tracking.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Appointment Scheduling</h3>
                <p className="text-gray-600">Efficient scheduling and reminder systems for better patient engagement.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Billing & Invoicing</h3>
                <p className="text-gray-600">Streamlined billing processes with integrated payment solutions.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Analytics & Reporting</h3>
                <p className="text-gray-600">Advanced analytics for practice insights and performance tracking.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sales & Partnerships</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Join our growing network of healthcare partners. AyurHealth offers comprehensive sales support and partnership programs designed to help healthcare providers maximize their practice potential.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Implementation Support</h3>
              <p className="text-gray-600 text-sm">Dedicated onboarding team to ensure smooth transition and training.</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Custom Solutions</h3>
              <p className="text-gray-600 text-sm">Tailored solutions to meet specific practice requirements and workflows.</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ongoing Support</h3>
              <p className="text-gray-600 text-sm">Continuous support and updates to keep your practice ahead of the curve.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technical Support</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our technical support team is available 24/7 to ensure your AyurHealth platform runs smoothly. We provide comprehensive technical assistance, system maintenance, and rapid issue resolution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Support Channels</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 24/7 Live Chat Support</li>
                <li>• Email Support: support@ayurhealth.com</li>
                <li>• Phone Support: +91-1800-XXX-XXXX</li>
                <li>• Knowledge Base & Documentation</li>
              </ul>
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Support
              </button>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Service Level Agreements</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 99.9% Uptime Guarantee</li>
                <li>• Response Time: less than 2 hours for critical issues</li>
                <li>• Regular System Updates & Maintenance</li>
                <li>• Data Backup & Security Assurance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose AyuHistory?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Cutting-edge technology combined with traditional Ayurvedic wisdom to deliver modern healthcare solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">
                Robust, secure, and scalable platform trusted by healthcare professionals across the industry.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Compliance</h3>
              <p className="text-gray-600">
                Fully compliant with healthcare regulations and data protection standards for peace of mind.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Support</h3>
              <p className="text-gray-600">
                Dedicated support team and comprehensive resources to ensure your success with AyurHealth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
