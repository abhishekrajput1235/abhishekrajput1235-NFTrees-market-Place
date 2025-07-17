import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../types/index";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`);
        const data = await res.json();
        setUser(data);
        setBio(data.bio || "");
        setWebsite(data.website || "");
        setTwitter(data.twitter || "");
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio, website, twitter }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await res.json();
      setUser(updatedUser);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Update failed!");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">User Profile</h1>

      <div className="mb-4">
        <label className="block font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Website</label>
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Twitter</label>
        <input
          type="text"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Public Info</h2>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Bio:</strong> {user?.bio || "No bio provided"}</p>
        <p><strong>Website:</strong> {user?.website || "No website provided"}</p>
        <p><strong>Twitter:</strong> {user?.twitter || "No Twitter handle provided"}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
