export default function VideoPlayer({ src }) {
  return (
    <video
      src={src}
      controls
      className="w-full max-h-[500px] object-cover rounded-lg"
    />
  );
}
