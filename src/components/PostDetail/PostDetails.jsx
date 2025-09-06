import styles from './PostDetails.module.css'

import { Link } from 'react-router-dom'

import React from 'react'

const PostDetails = ({ post }) => {
    return (
        <div className={styles.post_detail}>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p className={styles.createdby}>{post.createBody}</p>
            <div className={styles.tags}>
                {post.tags && post.tags.map((tag) => (
                    <p key={tag} className={styles.tag}> <span>#</span>{tag}</p>
                ))}
            </div>
            <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver Post</Link>
        </div>
    )
}

export default PostDetails
