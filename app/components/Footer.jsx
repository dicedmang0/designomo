import {Link, Links, NavLink} from '@remix-run/react';
import {useRootLoaderData} from '~/root';
import { useState,useEffect } from 'react';

/**
 * @param {FooterQuery & {shop: HeaderQuery['shop']}}
 */
export function Footer({menu, shop}) {
  const [showButton, setShowButton] = useState(false);

  const isBrowser = typeof window !== 'undefined';
  const [windowWidth, setWindowWidth] = useState(isBrowser ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling behavior
    });
  };

  // Function to handle scrolling
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      // Show the button when scrolled down 300 pixels
      setShowButton(true);
    } else {
      // Hide the button when at the top
      setShowButton(false);
    }
  };

  // Attach scroll event listener
  window.addEventListener('scroll', handleScroll);
  return (
    <footer className="footer">
      {isBrowser && windowWidth <= 768 ? (
        <div className="Footer-Container">
          
        <div>
            <button className="scroll-to-top" onClick={scrollToTop}>
              Scroll to Top
            </button>
        </div>
        <div className="Footer-Left">
            <Link to="/pages/about-us">
              <p> ABOUT US</p>
            </Link>
            <Link to="/pages/return-policy">
              <p>RETURN POLICY</p>
            </Link>
            <Link to="/pages/contact-us">
              <p>CONTACT US</p>
            </Link>
            <Link to="/pages/shipping-policy">
              <p>SHIPPING POLICY</p>
            </Link>
        </div>
        <div className="Footer-Right-Content">
          <div className="Footer-Middle">
          </div>
          <div className="Footer-Right">
            <div className="Right-Content">
              <span>© 2023 DESIGNBYOMO</span>
            </div>
          </div>
        </div>
        </div>
      ):(
        <div className="Footer-Container">
        <div className="Footer-Left">
            <Link to="/pages/about-us">
              <p> ABOUT US</p>
            </Link>
            <Link to="/pages/return-policy">
              <p>RETURN POLICY</p>
            </Link>
            <Link to="/pages/contact-us">
              <p>CONTACT US</p>
            </Link>
            <Link to="/pages/shipping-policy">
              <p>SHIPPING POLICY</p>
            </Link>
        </div>
        <div>
            <button className="scroll-to-top" onClick={scrollToTop}>
              Scroll to Top
            </button>
        </div>
        <div className="Footer-Right-Content">
          <div className="Footer-Middle">
          </div>
          <div className="Footer-Right">
            <div className="Right-Content">
              <span>© 2023 DESIGNBYOMO</span>
            </div>
          </div>
        </div>
      </div>
      )
}
    </footer>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */
function FooterMenu({menu, primaryDomainUrl}) {
  const {publicStoreDomain} = useRootLoaderData();

  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  )
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};
const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
