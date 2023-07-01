import Post from "../Post";
import {useEffect, useState} from "react";
import {URL} from '../App';

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch(`${URL}/post`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  );
}