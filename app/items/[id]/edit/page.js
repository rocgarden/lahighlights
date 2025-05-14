// app/items/[id]/edit/page.jsx
import { getItemById } from "@/services/itemService";
import EditItem from "@/app/components/EditItem"; //client component
import Breadcrumb from "@/app/components/Breadcrumb";
export default async function EditPage({ params }) {
  const item = await getItemById(params.id);

  if (!item) {
    return <div className="text-white p-6 pt-25">Item not found.</div>;
  }

  return (
    <div className="mt-25">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Edit",  },
        ]}
      />
      {/* <div className="max-w-4xl mx-auto p-6 pt-25 text-white"> */}
      <div className="flex flex-col mx-auto  bg-[#9ab581] items-center  min-h-screen mt-5 text-white">
        <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
        <EditItem item={item} />
      </div>
    </div>
  );
}
