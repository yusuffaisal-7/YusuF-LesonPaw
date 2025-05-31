// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './CheckoutForm';

// // import CheckoutFrom from './CheckoutFrom';
// // TODO Add Publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

// const Payment = () => {
//     return (
//         <div>
//             <h2>Payment page</h2>
//             <div>
//                 <Elements stripe={stripePromise}>
//                  {/* <CheckoutFrom></CheckoutFrom> */}
//                  <CheckoutForm></CheckoutForm>
//                 </Elements>
//             </div>
//         </div>
//     );
// };

// export default Payment;

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Payment Page</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
