
import type { SVGProps } from "react";

export function UserCircleStroke12(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      width="1em"
      height="1em"
      {...props}
    >
      <g fill="none" stroke="currentColor">
        <circle cx="6" cy="6" r="5.5"></circle>
        <circle cx="6" cy="4" r="1.5"></circle>
        <path
          strokeLinecap="round"
          d="M8.5 9C8.1 8.1 7 7.5 6 7.5S3.9 8.1 3.5 9"
        ></path>
      </g>
    </svg>
  );
}