import React from 'react';
import { clsx } from "clsx";

interface BaseLabelProps{
    id:string,
    className?:string,
    children?: React.ReactNode
}

function BaseLabel({ id, className, children }:BaseLabelProps) {
  return (
    <label
      className={clsx('block mb-2 text-base font-medium text-gray-700', className)}
      htmlFor={id}
    >
      {children}
    </label>
  )
}

// For our BaseInput we need the following props: id, label, type, error, required, disabled, valid, className, errorText, and rounded

export default BaseLabel;