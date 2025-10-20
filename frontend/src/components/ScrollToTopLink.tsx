import { Link as RouterLink, LinkProps } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollToTopLink: React.FC<ScrollToTopLinkProps> = ({ to, children, onClick, ...props }) => {
  const location = useLocation();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
    
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, 100);
  };

  return (
    <RouterLink to={to} onClick={handleClick} {...props}>
      {children}
    </RouterLink>
  );
};

// Hook to scroll to top on route changes - instantaneous
export const useScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);
};

export default ScrollToTopLink;