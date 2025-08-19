"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../components/Breadcrumb";
import Link from "next/link";
const MyPosts = () => {
  const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/signin");
        },
    });
 //   if (status === "loading") return null;

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.email) {
            fetch(`/api/items?email=${session.user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setItems(data);
                    setLoading(false);
                }).catch((err) => {
                    console.log("Error fetching user posts: ", err);
                    setLoading(false);
            })
        }
    }, [session]);
  

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete item");
      }
    } catch (err) {
      console.error("Error in deleting item", err);
    }
  };
  if (status === "loading" || loading) {
    return <p className="text-white p-6">Loading...</p>;
  }

  if (!session) {
    return <p className="text-white p-6">Please sign in</p>;
  }
        
  return (
    <div className="mt-25">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "My-Posts", href: "/my-posts" },
          { label: items.title }, // current page
        ]}
      />
      <div className="flex flex-col mx-auto bg-[#9ab581] items-center min-h-screen p-6 text-indigo-900">
        {/* <div className="flex flex-col bg-[#9ab581] items-center justify-center min-h-screen p-6"> */}

        <h1 className="text-3xl font-bold  mb-6">My Posts</h1>
        {items.length === 0 ? (
          <p>You haven't posted anything yet.</p>
        ) : (
          <ul className="space-y-6 bg-[#FFDB58] rounded-md">
            {items.map((item) => (
              <li
                key={item._id}
                className="bg-white/5 border m-3 rounded-lg p-4"
              >
                <div className="flex  justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Name: {item.title}
                    </h2>
                    <p className="text-md text-indigo-900 font-bold">
                      Section: {item.section}
                    </p>
                     <p className="text-md text-indigo-900 font-bold">
                      Category: {item.category}
                    </p>
                    <p className="text-sm">
                      <strong>Description:</strong>{item.content}
                    </p>
                    <span className="text-indigo-900 ml-auto">
                      🕒 Created:{" "}
                      {new Date(item.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle:"short"
                      })}
                    </span>
                      <span className="text-indigo-900 ml-auto">
                     {" "} 📆 Updated:
                      {new Date(item.updatedAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle:"short"
                      })}
                    </span>
                  </div>
                  <div className="space-x-2">
                    <Link
                      href={`/items/${item._id}/edit`}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
    
}

export default MyPosts;