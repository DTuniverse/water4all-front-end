import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:8080/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (token) {
      getData();
    }
  }, [token]);

  return (
    <div className="posts">
      {loading ? ( // Show loading message if loading is true
        <h1>Loading...</h1>
      ) : (
        <>
          {posts.length ? (
            posts.map((post) => (
              <div
                key={post._id}
                style={{ border: "2px solid black", margin: "10px" }}
              >
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))
          ) : (
            <h1 style={{ color: "red" }}>No posts found</h1>
          )}
        </>
      )}
    </div>
  );
}
