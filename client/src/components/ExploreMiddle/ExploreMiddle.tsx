import React, { useEffect } from "react";
import "./ExploreMiddle.css";
import Feed from "../Feed/Feed";
import { useSelector, useDispatch } from "react-redux";
import { getTrendingPosts } from "../../actions/posts";

const ExploreMiddle = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTrendingPosts())
  }, [dispatch])
  const posts = useSelector((posts: any) => posts.posts.postsData)
  return (
    <div>
      <div className="feeds">
        {posts?.map((post: any, index: React.Key) => (
          <Feed key={index} posts={post} />
        ))}
      </div>
    </div>
  );
};

export default ExploreMiddle;
