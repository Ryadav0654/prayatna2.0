import React from 'react'

const BigCard = () => {
  return (
    <div className="w-[70%] p-6 h-[80%] flex bg-white/70 rounded-4xl shadow-2xl items-center">
          <div className="w-1/2">Images</div>
          <div className="w-1/2 p-5">
            <p className="text-2xl font-semibold">
              Follow the procedure for your prior safety avoiding future
              catastrophies:
            </p>
            <ul className="mt-4 text-lg leading-relaxed">
              <li>Register/Login</li>
              <li>Fill NOC Application</li>
              <li>Pay Fees Online</li>
              <li>Track Application Status</li>
              <li>Fire Department Ispection</li>
              <li>NOC Approval &amp; Issuance </li>
              <li>Renewal & Compliance</li>
            </ul>
          </div>
        </div>
  )
}

export default BigCard