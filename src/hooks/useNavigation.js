import {useNavigate} from "react-router-dom";

const useNavigation = () => {
    const navigate = useNavigate();

    const link = (path) => {
        navigate(path);
    }
    const goBack = () => {
        navigate(-1);
    }
    const goForward = () => {
        navigate(1);
    }
    return {link, goBack, goForward};
};

export default useNavigation;
