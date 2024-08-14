import { notFound } from "next/navigation";

export async function generateStaticParams(){
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
    return posts.map(post => (
        { id: String(post.id) }
    ))
}

export default async function Page ({ params }) {
    const data = await getData(params.id)
    if(!data) {
        notFound()
    }
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
        </div>
    )
}

async function getData(id) {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts'+id);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}