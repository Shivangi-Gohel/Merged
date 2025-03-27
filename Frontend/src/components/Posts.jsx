// import React, { useState, useEffect } from 'react'

// function Posts() {
//     const [postName, setPostName] = useState("Creadit card Post machine")
//     const [description, setDescription] = useState("A secure and efficient POS machine for seamless credit card transactions.")
//     const [user, setUser] = useState("")
//   return (
//     <div className="container mx-auto p-4">
//         <div className='flex mb-10'>
//             <div className='text-3xl justify-between items-center w-full'>All Posts</div>
//             <input type="button" value='Add Post +' className='px-4 py-2 bg-blue-500 text-white rounded' />
//         </div>
//       <div className="flex flex-wrap justify-center gap-6">
//           <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-4 w-80">
//             <div className="text-lg font-semibold">{postName}</div>
//             <img
//               src="https://www.shutterstock.com/image-photo/selective-focus-edge-pos-machine-600nw-2468123301.jpg"
//               className="rounded w-80 h-80 object-cover"
//               alt="Post Image"/>
//             <p className="mt-2 text-center">{description}</p>
//             <p className='mt-2'>Posted by:- {user}</p>
//           </div>
//           <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-4 w-80">
//             <div className="text-lg font-semibold">{postName}</div>
//             <img
//               src="https://www.shutterstock.com/image-photo/selective-focus-edge-pos-machine-600nw-2468123301.jpg"
//               className="rounded w-80 h-80 object-cover"
//               alt="Post Image"/>
//             <p className="mt-2 text-center">{description}</p>
//             <p className='mt-2'>Posted by:- {user}</p>
//           </div>
//           <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-4 w-80">
//             <div className="text-lg font-semibold">{postName}</div>
//             <img
//               src="https://www.shutterstock.com/image-photo/selective-focus-edge-pos-machine-600nw-2468123301.jpg"
//               className="rounded w-80 h-80 object-cover"
//               alt="Post Image"/>
//             <p className="mt-2 text-center">{description}</p>
//             <p className='mt-2'>Posted by:- {user}</p>
//           </div>
//           <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-4 w-80">
//             <div className="text-lg font-semibold">{postName}</div>
//             <img
//               src="https://www.shutterstock.com/image-photo/selective-focus-edge-pos-machine-600nw-2468123301.jpg"
//               className="rounded w-80 h-80 object-cover"
//               alt="Post Image"/>
//             <p className="mt-2 text-center">{description}</p>
//             <p className='mt-2'>Posted by:- {user}</p>
//           </div>
//           <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-4 w-80">
//             <div className="text-lg font-semibold">{postName}</div>
//             <img
//               src="https://www.shutterstock.com/image-photo/selective-focus-edge-pos-machine-600nw-2468123301.jpg"
//               className="rounded w-80 h-80 object-cover"
//               alt="Post Image"/>
//             <p className="mt-2 text-center">{description}</p>
//             <p className='mt-2'>Posted by:- {user}</p>
//           </div>
//       </div>
      
//     </div>
//   )
// }

// export default Posts


import React,{ useState, useEffect } from "react";
import axios from "axios";

function Posts() {
  const [showModal, setShowModal] = useState(false);
  const [postName, setPostName] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postImage, setPostImage] = useState("");
  const [username, setUsername] = useState(""); // Will be fetched from MongoDB
  const [posts, setPosts] = useState([]); // Store all posts

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/users/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleAddPost = () => {

    const newPost = {
      postName,
      postDesc,
      postImage,
      userId,
    };

    setPosts([...posts, newPost]); // Add new post to the list
    setShowModal(false); // Close modal
    setPostName("");
    setPostDesc("");
    setPostImage("");
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">All Posts</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Post+
        </button>
      </div>

      {/* Post Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">{post.postName}</h3>
            <p>{post.postDesc}</p>
            <img src={post.postImage} alt="Post" className="w-full h-40 object-cover mt-2 rounded" />
            <p className="text-gray-500 text-sm mt-2">Posted by: {post.username}</p>
          </div>
        ))}
      </div>

      {/* Modal for Adding Post */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4">Add New Post</h2>
            <input
              type="text"
              placeholder="Post Name"
              value={postName}
              onChange={(e) => setPostName(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              placeholder="Post Description"
              value={postDesc}
              onChange={(e) => setPostDesc(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={postImage}
              onChange={(e) => setPostImage(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button onClick={handleAddPost} className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Submit
            </button>
            <button onClick={() => setShowModal(false)} className="ml-4 text-gray-500">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
