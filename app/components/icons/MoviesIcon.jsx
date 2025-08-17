export default function MoviesIcon({
  className = "w-8 h-8",
  title = "Movies",
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
        <path d="M20 4V32H12V4H20ZM32 0H28V4H24V0H8V4H4V0H0V36H4V32H8V36H24V32H28V36H32V0ZM24 12V8H28V12H24ZM4 12V8H8V12H4ZM24 20V16H28V20H24ZM4 20V16H8V20H4ZM24 28V24H28V28H24ZM4 28V24H8V28H4Z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
} 