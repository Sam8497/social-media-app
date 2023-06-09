import React, { useEffect } from "react";
import "./ExploreMiddleDark.css";
import FeedDark from "../FeedDark/FeedDark";
import { useSelector, useDispatch } from "react-redux";
import { getTrendingPosts } from "../../actions/posts";

const ExploreMiddleDark = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTrendingPosts())
  }, [dispatch])
  const posts = useSelector((posts: any) => posts.posts.postsData);
  return (
    <div>
      <div className="feeds">
        {posts?.map((post: any, index: React.Key) => (
          <FeedDark key={index} posts={post} />
        ))}
      </div>
    </div>
  );
};

export default ExploreMiddleDark;
