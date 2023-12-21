import {json, redirect} from '@shopify/remix-oxygen';
import {Form, Link, useActionData} from '@remix-run/react';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Login'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  if (await context.session.get('customerAccessToken')) {
    return redirect('/account');
  }
  return json({});
}

/**
 * @param {ActionFunctionArgs}
 */
export async function action({request, context}) {
  const {session, storefront} = context;

  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  try {
    const form = await request.formData();
    const email = String(form.has('email') ? form.get('email') : '');
    const password = String(form.has('password') ? form.get('password') : '');
    const validInputs = Boolean(email && password);

    if (!validInputs) {
      throw new Error('Please provide both an email and a password.');
    }

    const {customerAccessTokenCreate} = await storefront.mutate(
      LOGIN_MUTATION,
      {
        variables: {
          input: {email, password},
        },
      },
    );

    if (!customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      throw new Error(customerAccessTokenCreate?.customerUserErrors[0].message);
    }

    const {customerAccessToken} = customerAccessTokenCreate;
    session.set('customerAccessToken', customerAccessToken);

    return redirect('/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return json({error: error.message}, {status: 400});
    }
    return json({error}, {status: 400});
  }
}

export default function Login() {
  /** @type {ActionReturnData} */
  const data = useActionData();
  const error = data?.error || null;

  return (
    <div className="login">
      <div className="login-container"><h2 style={{marginBottom:'30px'}}>LOG IN</h2>
      <span style={{letterSpacing:'-0.78px',fontSize:'14px', marginBottom:'20px'}}>DONT HAVE AN ACCOUNT? <Link style={{textDecorationLine:'underline'}} to="/account/register">SIGN UP</Link> </span>
      <Form style={{marginTop:'10px'}} method="POST">
          <input
          style={{minWidth:'250px', height:'20px', borderRadius:'0px'}}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="ENTER EMAIL ADDRESS"
            aria-label="Email address"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <input
          style={{minWidth:'250px', height:'20px', borderRadius:'0px'}}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="ENTER PASSWORD"
            aria-label="Password"
            minLength={8}
            required
          />
        {error ? (
          <p>
            <mark>
              <small>{error}</small>
            </mark>
          </p>
        ) : (
          <br />
        )}
        <button style={{minWidth:'269px', borderRadius:'0px', background:'black', color:'white', height:'40px'}} type="submit">SIGN IN</button>
      </Form>
      <br />
      <div style={{display:"flex"}}>
        <span style={{fontSize:'14px', letterSpacing:'-0.78px'}}>FORGOT YOUR PASSWORD</span>
        <p style={{fontSize:'14px', letterSpacing:"-0.78px", marginLeft:'10px', textDecorationLine:'underline'}}>
          <Link to="/account/recover">CLICK HERE</Link>
        </p>
      </div>
      </div>
      
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customeraccesstokencreate
const LOGIN_MUTATION = `#graphql
  mutation login($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

/**
 * @typedef {{
 *   error: string | null;
 * }} ActionResponse
 */

/** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
