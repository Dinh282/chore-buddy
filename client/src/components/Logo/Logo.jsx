import MinimalLogo from "./MinimalLogo";
import CompleteLogo from "./CompleteLogo";

const Logo = ({ type = 'default' }) => {
    switch (type) {
        case 'minimal':
            return (
                <MinimalLogo />
            );

        case 'default':
        default:
            return (
               <CompleteLogo />
            );
    }
};

export default Logo;
