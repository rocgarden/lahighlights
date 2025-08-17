
export default function CoasterIcon({
    className = "w-8 h-8",
    title = "Coaster",
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
            <path d="M1 37C3.32965 36.9999 5.60021 36.2668 7.49008 34.9046C9.37996 33.5424 10.7933 31.6201 11.53 29.41L13 25C14.1649 21.5055 16.3997 18.4662 19.388 16.3124C22.3763 14.1587 25.9665 12.9999 29.65 13H37M35 13V37M11 37V31M19 37V17M27 14V37M25 1H35V7H25V1ZM7 11L15 5L19 10L11 16L7.4 15L7 11Z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}