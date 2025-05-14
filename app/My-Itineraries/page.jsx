// app/itineraries/my-itineraries/page.jsx
import MyItineraries from "@/app/components/MyItineraries";
import Breadcrumb from "../components/Breadcrumb";

export default function MyItinerariesPage() {
  return (
    <div className="mt-25">
   <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "My-Itineraries", href: "/my-itineraries" },
      ]}
      />
      <MyItineraries />
    </div>
  );
}
