import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Style?: string;
}

// Default styles for the input
const defaultStyle =
  "px-4 py-2 outline-none placeholder:text-white/30 rounded-lg";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ Style, ...props }, ref) => {
    return (
      <input
        ref={ref} // Attach the ref from React Hook Form
        className={`${defaultStyle} ${Style}`}
        {...props} // Spread all other props
      />
    );
  }
);

// Add a display name for easier debugging in React DevTools
Input.displayName = "Input";

export default Input;