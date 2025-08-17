export default function CoffeeIcon({
  className = "w-8 h-8",
  title = "Coffee",
  ...props
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      className={className}
      {...props}
    >
      {title ? <title>{title}</title> : null}
        <path id="coffeeLosAngelesTravel" d="M34 24H8V32C8 34.1217 8.84285 36.1566 10.3431 37.6569C11.8434 39.1571 13.8783 40 16 40H26C28.1217 40 30.1566 39.1571 31.6569 37.6569C33.1571 36.1566 34 34.1217 34 32V24ZM34 24H38C39.0609 24 40.0783 24.4214 40.8284 25.1716C41.5786 25.9217 42 26.9391 42 28V30C42 31.0609 41.5786 32.0783 40.8284 32.8284C40.0783 33.5786 39.0609 34 38 34H34M26 18C26 18 28 16 27 14L25 10C24 8 26 6 26 6M17.28 18C17.28 18 19.28 16 18.28 14L16.28 10C15.28 8 17.28 6 17.28 6" stroke="currentColor" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
} 





