export const metadata = {
  title: "Contact Us | LA Highlights",
  description: "Get in touch with the LA Highlights team.",
};

export default function ContactPage() {
  return (
    <main className="max-w-2xl my-20 mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="mb-4">
        Have questions, feedback, or just want to say hi? Reach out!
      </p>

      <ul className="space-y-4">
        <li>
          📧 <strong>Email:</strong>{" "}
          <a
            href="mailto:hello@norahbird.com"
            className="text-blue-600 hover:underline"
          >
            hello@norahbird.com
          </a>
        </li>
        <li>
          📍 <strong>Location:</strong> Los Angeles, CA
        </li>
        <li>
          📣 <strong>Collaboration:</strong> Interested in partnering? Reach out
          via email!
        </li>
      </ul>
    </main>
  );
}
