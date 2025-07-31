import Breadcrumb from "../components/Breadcrumb";
export const metadata = {
  title: "Privacy Policy | LA Highlights",
  description:
    "Learn how we collect, use, and protect your data at LA Highlights.",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto my-20 px-6 py-10 text-gray-800">
        <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Privacy"}
              ]}
            />  
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">Last updated: July 2025</p>

      <p className="mb-4">
        Norah Bird | LA Highlights ("we", "our", or "us") operates the website
        norahbird.com.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Log Data:</strong> We may collect standard log data when you
          visit our site.
        </li>
        <li>
          <strong>User Submissions:</strong> If you create or submit content, including any form of communication, we
          may store your name, email, and any information you provide.
        </li>
        <li>
          <strong>Cookies:</strong> We use cookies to analyze traffic and
          improve performance.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. How We Use Your Data
      </h2>
      <p className="mb-4">
        We use the collected information to operate and improve our services,
        personalize your experience, and communicate updates or newsletters (if
        you opt in).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Third-Party Services
      </h2>
      <p className="mb-4">
        We may use third-party tools like Google Analytics, Google AdSense, or
        social plugins that may collect information per their own privacy
        policies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Sharing</h2>
      <p className="mb-4">
        We do not sell or share your personal information with third parties
        except as necessary to operate the service or comply with the law.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Choices</h2>
      <p className="mb-4">
        You can disable cookies through your browser. If you've shared data with
        us, you may request deletion by contacting us at{" "}
        <strong>hello@norahbird.com</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. The latest version
        will always be posted here.
      </p>
    </main>
  );
}
