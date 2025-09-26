import React from 'react'

export default function BitcoinLogo({ size = 24, color = '#f7931a' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill={color} />
      <path
        d="M16.5 9.5C16.5 8 15.5 7 14 7V5.5H12.5V7H11.5V5.5H10V7H7V8.5H8.5V15.5H7V17H10V18.5H11.5V17H12.5V18.5H14V17C15.5 17 16.5 16 16.5 14.5C16.5 13.5 16 12.8 15.2 12.5C16 12.2 16.5 11.5 16.5 9.5ZM11 8.5H13.5C14.3 8.5 15 9.2 15 10C15 10.8 14.3 11.5 13.5 11.5H11V8.5ZM14 15.5H11V12.5H14C14.8 12.5 15 13.2 15 14C15 14.8 14.8 15.5 14 15.5Z"
        fill="white"
      />
    </svg>
  )
}