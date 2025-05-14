export default function CreatorBadge({ creator }) {
  const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
    creator
  )}`;

  return (
    <div className="mt-10 flex items-center space-x-3 text-sm text-indigo-900 ">
      {/* <span>Crafted by {creator}</span> */}
      Curated with ✨ by {" "} <span className="font-medium"> {creator}</span>
      <img
        src={avatarUrl}
        alt={`${creator}'s avatar`}
        className="w-8 h-8 rounded-full"
      />
    </div>
  );
}
