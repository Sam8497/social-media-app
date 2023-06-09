import React, { useEffect } from 'react'
import FeedDark from "../FeedDark/FeedDark";
import { useSelector, useDispatch } from "react-redux";
import { getTrendingPosts, searchPost } from "../../actions/posts";
import { useParams } from 'react-router-dom';

const SearchMiddleDark = () => {
    const { postname } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(searchPost(postname))
    }, [dispatch, postname])
    const posts = useSelector((posts: any) => posts.posts.postsData);
    return (
        <div>
            <div className="feeds">
                {posts?.map((post: any, index: React.Key) => (
                    <FeedDark key={index} posts={post} />
                ))}
            </div>
            {posts?.length === 0 ? <div style={{ width: "100%", justifyContent: "center", alignItems: "center", height: "70vh", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{
                    color: "white",
                    fontSize: "1.7rem",
                    lineHeight: "3rem"
                }}>No Results</p>
                <img src="/images/noRes.jpg" alt="" style={{
                    width: "100px",
                    height: "100px"
                }} />
            </div> : ""
            }
        </div>
    )
}

export default SearchMiddleDark