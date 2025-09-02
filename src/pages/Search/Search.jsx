import styles from './Search.module.css'

import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useQuery } from '../../hooks/useQuery'
import PostDetails from '../../components/PostDetail/PostDetails'
import { Link } from 'react-router-dom'

function Search() {
    const query = useQuery()
    const search = query.get("q")

    const { documents: posts } = useFetchDocument("posts", search)

    return (
        <div className={styles.search_container}>
            <h2>Search</h2>
            <div>
                {posts && posts.length === 0 && (
                    <>
                        <p>Não foram encontrados posts a partir da sua busca...</p>
                        <Link to="/" className='btn btn-dark'>Voltar</Link>
                    </>
                )}
                {posts && posts.map((post) => (
                    <PostDetails key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Search
