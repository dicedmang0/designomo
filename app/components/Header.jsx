import {Await, NavLink} from '@remix-run/react';
import {Suspense,useState, useEffect, } from 'react';
import {useRootLoaderData} from '~/root';
import SearchLogo from "../Assets/Search-ico.png";
import LoginLogo from "../Assets/account.png";
import CartLogo from "../Assets/cart.png"
import BackButton from "./BackButton";
import {useCurrency} from '../contexts/CurrencyContext'
import WaButton from '../Assets/WA.png';
import { useNavigate } from '@remix-run/react';
import USD from '../Assets/currency-flags.webp';
import IDR from '../Assets/indonesia.png';
import CurrencyButton from '../components/CurrencyButton';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart}) {
  const isBrowser = typeof window !== 'undefined';
  const [windowWidth, setWindowWidth] = useState(isBrowser ? window.innerWidth : 0);
  const {shop, menu} = header;
  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };
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
  return (
    <header className="header">
      {isBrowser && windowWidth <= 768 ? (
        <div>
          <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <SearchToggle />
      <CurrencyButton currency={currency} setCurrency={setCurrency} />
      
      <NavLink prefetch="intent" to="/" style={{width:'50%', display: 'flex', justifyContent:'center',flexWrap:'wrap',alignSelf:'flex-start', position:'relative'}} end>
          <img className='Header-logo' src={shop.brand.logo.image.url} />
        </NavLink>
      <div className='Left-group-btn'>
      <CartToggle cart={cart} />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        {isLoggedIn ? 'Account' : <img src={LoginLogo} />}
      </NavLink>
      <a href='https://wa.link/y5v5qz' id="floatingButton"></a>
      </div>
    </nav>

        </div>
      ): (
        <div className='isDesktop'>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
        />
        <BackButton/>
          </div>
        <NavLink prefetch="intent" to="/" style={{width:'50%', display: 'flex', justifyContent:'center',flexWrap:'wrap',alignSelf:'flex-start',position:'relative'}} end>
          <img className='Header-logo'  src={shop.brand.logo.image.url} />
        </NavLink>
        <CurrencyButton currency={currency} setCurrency={setCurrency} />
      <a href='https://wa.link/x0l5py' id="floatingButton"></a>
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
      )}
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({menu, primaryDomainUrl, viewport}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdown = (itemId) => {
    if (openDropdown !== null && openDropdown !== itemId) {
      setOpenDropdown(null);
      // Optional: Add a slight delay before opening the new dropdown
      setTimeout(() => setOpenDropdown(itemId), 1000);
  } else {
      // Toggle the current item's dropdown
      setOpenDropdown(openDropdown === itemId ? null : itemId);
  }
  };
  const {publicStoreDomain} = useRootLoaderData();
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    let navigate = useNavigate();
    if (viewport === 'mobile') {
      event.preventDefault();
      navigate(event.currentTarget.getAttribute('href'));
    }
    setOpenDropdown(null)
  }

  return (
    <nav className={className} role="navigation">
  {viewport === 'mobile' && (
    <NavLink
      end
      onClick={closeAside}
      prefetch="intent"
      style={activeLinkStyle}
      to="/"
    >
      Home
    </NavLink>
  )}
  {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
    if (!item.url) return null;
    const url =
      item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain) ||
      item.url.includes(primaryDomainUrl)
        ? new URL(item.url).pathname
        : item.url;

    const hasSubmenu = item.items && item.items.length > 0;
    const isSaleItem = item.title.toUpperCase() === 'SALE';
        const linkStyle = {
          ...activeLinkStyle,
          color: isSaleItem ? 'red' : 'black', // Red color for SALE, black for others
        };
    return (
      <div key={item.id}>
            {hasSubmenu ? (
              <div className="dropdown">
                <button
                  className="dropbtn"
                  onClick={() => handleDropdown(item.id)}
                >
                  {item.title}
                </button>
                <div className={`dropdown-content${openDropdown === item.id ? ' show' : ''}`}>
                  {item.items.map((submenu) => (
                    <NavLink
                      className="header-menu-item"
                      end
                      key={submenu.id}
                      onClick={closeAside}
                      prefetch="intent"
                      style={activeLinkStyle}
                      to={submenu.url}
                    >
                      {submenu.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                className="header-menu-item"
                end
                key={item.id}
                onClick={closeAside}
                prefetch="intent"
                style={linkStyle}
                to={url}
              >
                {item.title}
              </NavLink>
            )}
          </div>
    );
  })}
</nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <SearchToggle />
      <div style={{display: 'flex', flexDirection:'column', gridGap:'1rem',alignItems:'flex-end'}}>
      <CartToggle cart={cart} />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        {isLoggedIn ? 'Account' : 'LOGIN'}
      </NavLink>
      </div>
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3 style={{fontSize:'20px', margin:'0px', paddingBottom:'8px'}}>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside"><img src={SearchLogo} /></a>;
}

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
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
  return (
    <a href="#cart-aside">
      {isBrowser && windowWidth <= 768 ?(
      <img src={CartLogo} />
    ):
    (
      <span>
        CART({count})
      </span>
    )
    }
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={(cart.totalQuantity || 0)} />;
        }}
      </Await>
    </Suspense>
  );
}

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

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('./Layout').LayoutProps} LayoutProps */
