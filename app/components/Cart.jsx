import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {useVariantUrl} from '~/utils';
import Rbtn from '../Assets/removebtn.png';
import {useCurrency} from '../contexts/CurrencyContext'

/**
 * @param {CartMainProps}
 */
export function CartMain({layout, cart, currency}) {
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart.discountCodes.filter((code) => code.applicable).length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;

  return (
    <div className={className}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <CartDetails cart={cart} layout={layout} currency={currency} />
    </div>
  );
}

/**
 * @param {CartMainProps}
 */
function CartDetails({layout, cart, currency}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;

  return (
    <div className="cart-details">
      <CartLines lines={cart?.lines} layout={layout} currency={currency} />
      {cartHasItems && (
        <CartSummary cost={cart.cost} currency={currency} layout={layout}>
          <CartDiscounts discountCodes={cart.discountCodes} />
          <p style={{fontFamily:'Arial', textTransform:'uppercase', fontSize:'10px', textAlign:'justify'}}>Shipments will be processed Monday-Friday. Orders placed after 3.00 PM (+7 GMT) will be processed in the next following business days.</p>
          <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
        </CartSummary>
      )}
    </div>
  );
}

/**
 * @param {{
 *   layout: CartMainProps['layout'];
 *   lines: CartApiQueryFragment['lines'] | undefined;
 * }}
 */
function CartLines({lines, layout, currency}) {
  if (!lines) return null;

  return (
    <div aria-labelledby="cart-lines">
      <ul>
        {lines.nodes.map((line) => (
          <CartLineItem key={line.id} line={line} layout={layout} currency={currency} />
        ))}
      </ul>
    </div>
  );
}

/**
 * @param {{
 *   layout: CartMainProps['layout'];
 *   line: CartLine;
 * }}
 */
function CartLineItem({layout, line, currency}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

  return (
    <li key={id} className="cart-line">
      {image && (
        <Image
          alt={title}
          aspectRatio="1/1"
          data={image}
          height={130}
          loading="lazy"
          width={130}
        />
      )}

      <div style={{display:'flex', flexDirection:'column', width:'100%', fontFamily:'Arial',paddingRight:'5px',justifyContent:'space-between'}}> 
        <div style={{display:'flex', fontSize:'13px', justifyContent:'space-between',alignItems:'flex-start'}}>
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => {
            if (layout === 'aside') {
              // close the drawer
              window.location.href = lineItemUrl;
            }
          }}
        >
          <p style={{fontSize:'13px', textTransform:'uppercase', maxWidth:'120px'}}>
            <strong>{product.title}</strong>
          </p>
        </Link>
        <CartLinePrice line={line} as="span" currency={currency} />
        </div>

        <ul style={{fontSize:'13px',fontWeight:'500',maxWidth:'95px'}}>
          {selectedOptions.map((option) => (
            <li style={{marginBottom:'5px'}} key={option.name}>
              <small style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                {option.name}: <span style={{}}>{option.value}</span>
              </small>
            </li>
          ))}
        </ul>
        <CartLineQuantity line={line} />
      </div>
    </li>
  );
}

/**
 * @param {{checkoutUrl: string}}
 */
function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <a href={checkoutUrl} target="_self">
        <button style={{width:'360px', maxWidth:'360px', height:'40px', background:'black',color:'white',cursor:'pointer'}}>
          CHECKOUT
        </button>
      </a>
      <br />
    </div>
  );
}

/**
 * @param {{
 *   children?: React.ReactNode;
 *   cost: CartApiQueryFragment['cost'];
 *   layout: CartMainProps['layout'];
 * }}
 */
export function CartSummary({cost, layout, children = null}) {
  const { currency } = useCurrency();
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';
    const convertPrice = (amount) => {
      // Example conversion logic (you'll need to replace this with real logic)
      const exchangeRate = currency === 'USD' ? 0.000068 : 1; // Replace with actual exchange rate
      return amount * exchangeRate;
    };

    const formatCurrency = (amount, currency) => {
      if (currency === 'USD') {
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      } else {
        // For IDR, manually add the 'IDR' code and format with dot separators
        return `IDR ${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
      }
    };

    const convertedSubtotal = cost?.subtotalAmount?.amount
    ? formatCurrency(convertPrice(cost.subtotalAmount.amount), currency)
    : null;
  return (
    <div aria-labelledby="cart-summary" className={className}>
      <dl className="cart-subtotal">
        <strong style={{fontSize:'14px'}}>TOTAL</strong>
        <strong style={{fontSize:'14px', fontStyle:'italic',letterSpacing:'-0.715px'}}>
        {convertedSubtotal || '-'}
        </strong>
      </dl>
      <dl style={{display:'flex',justifyContent:'space-between',fontSize:'14px'}} >
        <strong style={{letterSpacing:'-0.715px'}}>SHIPPING</strong>
        <span style={{fontStyle:'italic',letterSpacing:'-0.715px'}}>CALCULATED AT CHECKOUT</span>
      </dl>
      {children}
    </div>
  );
}

/**
 * @param {{lineIds: string[]}}
 */
function CartLineRemoveButton({lineIds}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button style={{marginTop:'10px'}} type="submit"><img src={Rbtn} alt='remove-button' /></button>
    </CartForm>
  );
}

/**
 * @param {{line: CartLine}}
 */
function CartLineQuantity({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="cart-line-quantiy">
      <div style={{display:'flex', width:'100%', justifyContent:'space-between', maxWidth:'100px'}}>
        <div>
          <small>Qty:</small>
        </div>
        <div style={{display:'flex'}}>
      <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
          name="decrease-quantity"
          value={prevQuantity}
        >
          <span>&#8722; </span>
        </button>
      </CartLineUpdateButton>
      &nbsp;
      <small style={{fontSize:'13px'}}> {quantity} &nbsp;&nbsp;</small>
      <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
        >
          <span>&#43;</span>
        </button>
      </CartLineUpdateButton>
        </div>
      </div>
      <CartLineRemoveButton lineIds={[lineId]} />
    </div>
  );
}

/**
 * @param {{
 *   line: CartLine;
 *   priceType?: 'regular' | 'compareAt';
 *   [key: string]: any;
 * }}
 */
function CartLinePrice({line, priceType = 'regular', currency, ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  const convertPrice = (price) => {
    // Replace with your currency conversion logic
    const exchangeRate = currency === 'USD' ? 0.000068 : 1;
    return price * exchangeRate;
  };

  const formatCurrency = (amount, currency) => {
    if (currency === 'USD') {
      return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else {
      return `IDR ${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    }
  };

  const priceValue = formatCurrency(convertPrice(moneyV2.amount), currency);

  return (
    <div style={{fontStyle:'italic', fontFamily:'Arial',fontWeight:'500', letterSpacing:'-0.715px'}}>
     <small>
     {priceValue}
     </small>
    </div>
  );
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
export function CartEmpty({hidden = false, layout = 'aside'}) {
  return (
    <div hidden={hidden}>
      <br />
      <p>
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <br />
      <Link
        to="/collections/all"
        onClick={() => {
          if (layout === 'aside') {
            window.location.href = '/collections/all';
          }
        }}
      >
        Continue shopping →
      </Link>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes: CartApiQueryFragment['discountCodes'];
 * }}
 */
function CartDiscounts({discountCodes}) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button>Remove</button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div style={{display:'flex', justifyContent:'space-between',alignItems:'baseline'}}>
          <input style={{borderRadius:'0px'}} type="text" name="discountCode" placeholder="Discount code" />
          <button style={{ height:'32px', width:'170px',background:'black',color:'white', cursor:'pointer'}} type="submit">APPLY</button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
function UpdateDiscountForm({discountCodes, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({children, lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/** @typedef {CartApiQueryFragment['lines']['nodes'][0]} CartLine */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: 'page' | 'aside';
 * }} CartMainProps
 */

/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
