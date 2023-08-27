import MinimalLogo from "./MinimalLogo";
import CompleteLogo from "./CompleteLogo";

const Logo = ({ type = 'default', className }) => {
    switch (type) {
        case 'minimal':
            return (
                <MinimalLogo className={className} />
            );

        case 'default':
        default:
            return (
               <CompleteLogo className={className} />
            );
    }
};

export default Logo;
