import { useLocation } from 'react-router-dom';

const GetLocation = () => {
    const location = useLocation();
    console.log(location.state.key);
    return location
};

export default GetLocation;