import {useEffect, useState} from 'react';
import axios from 'axios';

type Post = {
  id: string;
  date: string;
  title: string;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);

  useEffect(() => {
    axios.get('/api/v1/posts')
      .then(response => {
        setPosts(response.data);

        if (response.data.length === 0) {
          setEmpty(true);
        }

        setLoading(false);
      }, () => setLoading(false));
  }, []);

  return {loading, empty, posts}
}
