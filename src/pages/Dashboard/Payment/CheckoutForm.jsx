

// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// import { useContext, useEffect, useState } from "react";

// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// import { AuthContext } from "../../../providers/AuthProvider";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useCart from "../../../hooks/useCart";


// const CheckoutForm = () => {
//     const [error, setError] = useState('');
//     const [clientSecret, setClientSecret] = useState('')
//     const [transactionId, setTransactionId] = useState('');
     
//     const stripe = useStripe();
//     const elements = useElements();
//     const axiosSecure = useAxiosSecure();
//     const { user } = useContext(AuthContext);
//     const [cart, refetch] = useCart();
//     const navigate = useNavigate();

//     const totalPrice = cart.reduce((total, item) => total + item.price, 0)

//     useEffect(() => {
//         if (totalPrice > 0) {
//             axiosSecure.post('/create-payment-intent', { price: totalPrice })
//                 .then(res => {
//                     console.log(res.data.clientSecret);
//                     setClientSecret(res.data.clientSecret);
//                 })
//         }

//     }, [axiosSecure, totalPrice])

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return
//         }

//         const card = elements.getElement(CardElement)

//         if (card === null) {
//             return
//         }

//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card
//         })

//         if (error) {
//             console.log('payment error', error);
//             setError(error.message);
//         }
//         else {
//             console.log('payment method', paymentMethod)
//             setError('');
//         }

//         // confirm payment
//         const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: card,
//                 billing_details: {
//                     email: user?.email || 'anonymous',
//                     name: user?.displayName || 'anonymous'
//                 }
//             }
//         })

//         if (confirmError) {
//             console.log('confirm error')
//         }
//         else {
//             console.log('payment intent', paymentIntent)
//             if (paymentIntent.status === 'succeeded') {
//                 console.log('transaction id', paymentIntent.id);
//                 setTransactionId(paymentIntent.id);

//                 // now save the payment in the database
//                 const payment = {
//                     email: user.email,
//                     price: totalPrice,
//                     transactionId: paymentIntent.id,
//                     date: new Date(), // utc date convert. use moment js to 
//                     cartIds: cart.map(item => item._id),
//                     menuItemIds: cart.map(item => item.menuId),
//                     status: 'pending'
//                 }

//                 const res = await axiosSecure.post('/payments', payment);
//                 console.log('payment saved', res.data);
//                 refetch();
//                 if (res.data?.paymentResult?.insertedId) {
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: "Thank you for the taka paisa",
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                     navigate('/dashboard/paymentHistory')
//                 }

//             }
//         }

//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement
//                 options={{
//                     style: {
//                         base: {
//                             fontSize: '16px',
//                             color: '#424770',
//                             '::placeholder': {
//                                 color: '#aab7c4',
//                             },
//                         },
//                         invalid: {
//                             color: '#9e2146',
//                         },
//                     },
//                 }}
//             />
//             <button className="btn btn-sm btn-primary my-4" type="submit"  disabled={!stripe || !clientSecret}>
//                 Pay
//             </button>
           
//             <p className="text-red-600">{error}</p>
//             {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
//         </form>
//     );
// };

// export default CheckoutForm;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const navigate = useNavigate();

   const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0);
    console.log("Total Price:", totalPrice);
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    const secret = res.data?.clientSecret;
                    if (secret) {
                        setClientSecret(secret);
                    } else {
                        console.error("Missing clientSecret in response", res.data);
                    }
                })
                .catch(err => {
                    console.error("Failed to create payment intent", err);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setProcessing(true);
        setError('');

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            setProcessing(false);
            return;
        }

        // const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: {
        //         card: card,
        //         billing_details: {
        //             email: user?.email || 'anonymous',
        //             name: user?.displayName || 'anonymous'
        //         }
        //     }
        // });
const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
        card: card,
        billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
        }
    }
});

if (confirmError) {
    console.log("Confirm Error:", confirmError);
    setError(confirmError.message);
    setProcessing(false);
    return;
}
        if (confirmError) {
            setError(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(),
                cartIds: cart.map(item => item._id),
                menuItemIds: cart.map(item => item.menuId),
                status: 'pending'
            };

            try {
                const res = await axiosSecure.post('/payments', payment);
                refetch();

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymentHistory');
                }
            } catch (error) {
                console.error("Error saving payment:", error);
            }
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="btn btn-sm btn-primary my-4"
            >
                {processing ? "Processing..." : "Pay"}
            </button>
            <p>price:{totalPrice} </p>
            {error && <p className="text-red-600">{error}</p>}
            {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
