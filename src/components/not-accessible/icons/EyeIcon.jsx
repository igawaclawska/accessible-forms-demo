export default function EyeIcon({ isOpen }) {
  return isOpen ? (
    // Eye open icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        stroke="black"
        strokeWidth="2"
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
      />
      <circle cx="12" cy="12" r="3" stroke="black" strokeWidth="2" />
    </svg>
  ) : (
    // Eye closed icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        stroke="black"
        strokeWidth="2"
        d="M3 3l18 18M10.73 6.73A10.97 10.97 0 0 1 12 6c7 0 11 6 11 6a17.92 17.92 0 0 1-4.06 5.06M6.53 6.53A17.92 17.92 0 0 0 1 12s4 7 11 7a10.97 10.97 0 0 0 5.27-1.27"
      />
      <circle cx="12" cy="12" r="3" stroke="black" strokeWidth="2" />
    </svg>
  );
}
