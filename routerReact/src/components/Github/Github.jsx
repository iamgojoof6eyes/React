import { useLoaderData } from 'react-router-dom';

function Github() {
    const data = useLoaderData();
    // const [data, setData] = useState([])
    // useEffect(
    //     () => {
    //         fetch('https://api.github.com/users/iamgojoof6eyes')
    //         .then(response => response.json())
    //         .then(data => {setData(data); console.log(data)})
    //     },
    //     []
    // )
    return (
        <div className='text-center text-3xl'>
            Github Followers: {data.followers}
            <img src={data.avatar_url} alt="GitHub Avatar" />
        </div>
    )
}

export default Github


/* 
Not recommended but for this tutorial prupose create the loader in same file
*/

export const githubLoader = async () => {
    const res = await fetch('https://api.github.com/users/iamgojoof6eyes')
    return res.json()
}