import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageStoryCard = ({ story, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: story.name,
    quote: story.quote,
    details: story.details,
    imageURL: story.imageURL,
  });

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this story?')) return;

    try {
      await axiosSecure.delete(`/stories/${story._id}`);
      toast.success('Story deleted successfully');
      refetch();
    } catch (err) {
      toast.error('Failed to delete story');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.put(`/stories/${story._id}`, formData);
      toast.success('Story updated successfully');
      setIsEditing(false);
      refetch();
    } catch (err) {
      toast.error('Failed to update story');
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md space-y-2">
      {!isEditing ? (
        <>
          <img src={story.imageURL} alt="story" className="w-full h-40 object-cover rounded-md" />
          <p className="text-sm italic text-gray-700">"{story.quote}"</p>
          <p className="font-bold">{story.name}</p>
          <p className="text-xs text-gray-500">{story.details}</p>
          <div className="flex gap-4 mt-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-500 flex items-center gap-1">
              <FaEdit /> Edit
            </button>
            <button onClick={handleDelete} className="text-red-500 flex items-center gap-1">
              <FaTrash /> Delete
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleEdit} className="space-y-2">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border px-2 py-1 rounded"
            placeholder="Name"
          />
          <input
            type="text"
            value={formData.imageURL}
            onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
            className="w-full border px-2 py-1 rounded"
            placeholder="Image URL"
          />
          <textarea
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="w-full border px-2 py-1 rounded"
            placeholder="Quote"
          />
          <input
            type="text"
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full border px-2 py-1 rounded"
            placeholder="Details"
          />
          <div className="flex gap-3">
            <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ManageStoryCard;
