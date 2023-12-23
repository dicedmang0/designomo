import closebtn from '../Assets/close.png';
/**
 * A side bar component with Overlay that works without JavaScript.
 * @example
 * ```jsx
 * <Aside id="search-aside" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 *
 * @param {{
 *   children?: React.ReactNode;
 *   heading: React.ReactNode;
 *   id?: string;
 * }}
 */
export function Aside({children, heading, id = 'aside', }) {
  const asideClassName = `aside-${id}`;
  const asideStyle = {};
  // if (id === 'search-aside') {
  //   asideStyle.width = '100%';
  //   asideStyle['backdrop-filter'] = 'blur(4px)';
  //   asideStyle['background-color'] = 'rgba(255, 255, 255, 0.5)';
  // } else if (id === 'cart-aside') {
  //   asideStyle.maxWidth = '400px'; // Max width of 400px for cart-aside
  //   asideStyle.width = '100%'; // Ensure it takes full width if content is less than 400px
  // }
  return (
    <div aria-modal className={`overlay ${asideClassName}`} id={id} role="dialog">
      <button
        className="close-outside"
        onClick={() => {
          history.go(-1);
          window.location.hash = '';
        }}
      />
      <aside style={asideStyle}>
        <header>
          {/* <h3>{heading}</h3> */}
          <CloseAside />
        </header>
        <main>{children}</main>
      </aside>
    </div>
  );
}

function CloseAside() {
  return (
    /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
    <a className="close" href="#" onChange={() => history.go(-1)}>
      <img src={closebtn}/>
    </a>
  );
}
