import Post from "../Post";
import {useEffect, useState} from "react";
import {URL} from '../App';
import axios from 'axios';

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    axios.get(`${URL}/post`)
      .then(response => {
        const posts = response.data;
        setPosts(posts);
      })
      .catch(error => {
        console.error('Error retrieving posts:', error);
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