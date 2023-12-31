import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import { useLocation } from '@remix-run/react';
import { useCurrency } from '../contexts/CurrencyContext'

/**
 * @param {LayoutProps}
 */
export function Layout({cart, children = null, footer, header, isLoggedIn}) {
  const location = useLocation(); // Get the current location
  const pathname = location.pathname;
  const showHeaderAndFooter = !(pathname === '/account/login' || pathname === '/account/register');
  return (
    <>
    {showHeaderAndFooter && (
      <>
      <CartAside cart={cart} />
        <SearchAside />
        <MobileMenuAside menu={header.menu} shop={header.shop} />
        <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />
      </>
    )}
      <main>{children}</main>
      {showHeaderAndFooter && (
        <Suspense>
          <Await resolve={footer}>
            {(footer) => <Footer menu={footer.menu} shop={header.shop} />}
          </Await>
        </Suspense>
      )}
    </>
  );
}

/**
 * @param {{cart: LayoutProps['cart']}}
 */
function CartAside({cart}) {
  const { currency } = useCurrency();
  return (
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" currency={currency} />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button style={{background:'black', color:'white', borderRadius:'0px', fontFamily:'Arial', fontSize:'10px', padding:'8px'}} type="submit">SEARCH</button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

/**
 * @param {{
 *   menu: HeaderQuery['menu'];
 *   shop: HeaderQuery['shop'];
 * }}
 */
function MobileMenuAside({menu, shop}) {
  return (
    <Aside id="mobile-menu-aside" heading="MENU">
      <HeaderMenu
        menu={menu}
        viewport="mobile"
        primaryDomainUrl={shop.primaryDomain.url}
      />
    </Aside>
  );
}

/**
 * @typedef {{
 *   cart: Promise<CartApiQueryFragment | null>;
 *   children?: React.ReactNode;
 *   footer: Promise<FooterQuery>;
 *   header: HeaderQuery;
 *   isLoggedIn: boolean;
 * }} LayoutProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
