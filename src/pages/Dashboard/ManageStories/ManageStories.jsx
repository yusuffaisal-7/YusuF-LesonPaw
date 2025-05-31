import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ManageStoryCard from './ManageStoryCard';


const ManageStories = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stories = [], isLoading, refetch } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await axiosSecure.get('/stories');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Manage Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <ManageStoryCard key={story._id} story={story} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default ManageStories;
