import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import React from "react";
// import Layout from '../../../components/layout'
import {getAllPostsWithSlug as getLatestSermons, getSermon} from '../../../lib/api'
import styles from './[id].module.scss'

export default function Post({sermon}) {
    const router = useRouter()

    if (!router.isFallback && !sermon) {
        return <ErrorPage statusCode={404}/>
    }

    const imageSrc = sermon.imageWithFallback.url,
        imageAlt = sermon.title;

    return (
        <div>
            {router.isFallback ? (
                <h1>Loading…</h1>
            ) : (
                <div>
                    <div className={styles.meta}>
                        {imageSrc ? <img src={imageSrc} alt={imageAlt}/> : null}
                        <div>
                            <h1>{sermon.title}</h1>
                            <ul className={styles.speakers}>
                                {sermon.persons.map(speaker => {
                                    return <li key={speaker.name}>{speaker.name}</li>
                                })}
                            </ul>
                        </div>
                    </div>

                    {sermon.recordingDate ? <p>{(new Date(sermon.recordingDate)).toLocaleDateString()}</p> : null}
                    {sermon.audioFiles.map(file => {
                        return <div key={file.url}>
                            <audio controls src={file.url} preload={'metadata'}>Your browser doesn't support this
                                player.
                            </audio>
                        </div>
                    })}

                    {sermon.description ? <div dangerouslySetInnerHTML={{__html: sermon.description}}/> : null}

                    Other sermons: ...
                </div>
            )}
        </div>
    )
}

export async function getStaticProps({params}) {
    const sermon = await getSermon(params.id)

    return {
        props: {
            sermon,
        },
        revalidate: 10,
    }
}


export async function getStaticPaths() {
    const allPosts = await getLatestSermons()
    const cutOffDate = new Date('2020-06-01')

    return {
        paths: allPosts.nodes.filter(node => new Date(node.recordingDate) > cutOffDate).map((node) => `/en/sermons/${node.id}`) || [],
        fallback: 'unstable_blocking',
    }
}
