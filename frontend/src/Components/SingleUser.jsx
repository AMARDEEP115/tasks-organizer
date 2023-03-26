import { Avatar } from '@chakra-ui/react';
import "./SingleUsers.css";

const SingleUser=({name})=>{
    return <div id="SingleUser">
        <Avatar name={name} />
        <div>
            <h1>{name}</h1>
        </div>
    </div>
}

export default SingleUser;