import Breadcrumb from "../components/Breadcrumb";
export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto mt-24 px-6 pb-20 text-indigo-950">
      <Breadcrumb items={[{ label: "Home", href: "/" }]} />
      <h1 className="text-4xl font-bold mb-6">Terms & Disclaimer</h1>
      <p className="mb-4">
        The content on this site is intended for informational and inspirational
        purposes only.
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          Always verify hours, pricing, and accessibility directly with venues.
        </li>
        <li>Activities mentioned may not be suitable for all individuals.</li>
        <li>
          We are not responsible for injury, loss, or damages resulting from use
          of this content.
        </li>
      </ul>
      ## Terms of Use & Disclaimer **Effective Date:** \July 28, 2025 Welcome to
      \Norah Bird ("we," "our," or "us"). By using our website, you agree
      to these Terms of Use and Disclaimer. Please read them carefully. --- ###
      1. Informational Purposes Only All content provided on this site is for
      **general informational purposes** only. Itineraries, recommendations, and
      highlights are based on personal experience and research. They are not a
      substitute for professional advice or official sources. ### 2. Accuracy
      and Availability We strive to keep information current but **cannot
      guarantee the accuracy, completeness, or availability** of any content.
      Hours of operation, pricing, and conditions may change. ### 3. Third-Party
      Links We may include links to third-party websites (e.g., maps,
      restaurants, attractions). These are provided for convenience. We are
      **not responsible** for their content, policies, or accuracy. ### 4. Use
      at Your Own Risk By using our itineraries or recommendations, you
      **acknowledge and accept all associated risks**. Always confirm details
      directly with venues or official resources before visiting. Activities are
      undertaken at your own discretion. ### 5. Health, Safety & Accessibility
      Please be aware that: * **Food and location recommendations may not
      account for allergens or dietary needs.** * **Accessibility features** may
      vary and should be confirmed with the provider. * **Outdoor or physical
      activities** may involve risks—always consult relevant authorities and use
      appropriate precautions. ### 6. Intellectual Property All text, images,
      designs, and other content on this site are the **intellectual property of
      Norah Bird** unless otherwise stated. Unauthorized
      reproduction or distribution is prohibited. ### 7. Modifications We may
      update these terms at any time without prior notice. Continued use of the
      site constitutes your acceptance of any changes. ### 8. Governing Law
      These terms are governed by the laws of \[Your State/Country].All
      trademarks, logos, and brand names are the property of their respective
      owners. All company, product, and service names used in this website are
      for identification purposes only. Use of these names, trademarks, and
      brands does not imply endorsement. --- If you have any questions about
      these terms, please contact us at \contact@norahbird.com. Thank you for
      visiting!
      <p className="text-sm text-black/60 text-center">
        ***By using this site, you acknowledge and accept these terms.***
      </p>
    </main>
  );
}
