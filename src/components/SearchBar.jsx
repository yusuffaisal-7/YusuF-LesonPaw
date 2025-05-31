// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SearchBar = () => {
//   const [query, setQuery] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/services?search=${encodeURIComponent(query)}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSearch} className="form-control w-full max-w-md mx-auto my-4 bg-slate-800">
//       <div className="input-group">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search by subject, location, or tutor name..."
//           className="input input-bordered w-full"
//         />
//         <button type="submit" className="btn btn-primary">Search</button>
//       </div>
//     </form>
//   );
// };

// export default SearchBar;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/services?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="form-control w-full max-w-md mx-auto my-4 bg-slate-800">
      <div className="input-group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by subject, location, or tutor name..."
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;