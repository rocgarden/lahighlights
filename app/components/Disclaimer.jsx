export default function Disclaimer() {
  return (
    <div className="mt-16 text-sm bg-black/50 rounded text-white/60 border-t border-white/20 pt-6 px-2 sm:px-0">
      <p className="mb-2">
        ⚠️ <strong>Disclaimer:</strong> This content is provided for inspiration
        only. Please check ahead for:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Allergen and dietary accommodations</li>
        <li>Accessibility and mobility needs</li>
        <li>Current hours or seasonal closures</li>
        <li>Booking or reservation requirements</li>
        <li>Weather and safety conditions</li>
        <li>Pricing, entry fees, and availability</li>
      </ul>
      <p className="mt-3">
        Use at your own risk. See our{" "}
        <a href="/terms" className="underline hover:text-blue-300">
          full terms
        </a>{" "}
        for more.
      </p>
    </div>
  );
}
