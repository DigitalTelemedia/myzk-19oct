"use client";
import { CustomButton, SectionTitle } from "@/components";
import { useProductStore } from "../_zustand/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  isValidCardNumber,
  isValidCreditCardCVVOrCVC,
  isValidCreditCardExpirationDate,
  isValidEmailAddressFormat,
  isValidNameOrLastname,
} from "@/lib/utils";
// import ENDPOINT from "../../config/appConfig";
import ENDPOINT from "@/config/appConfig";
import LoginPage from "../login/page";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Login from "@/components/Login";
import Register from "@/components/Register";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { checkPostalCodeService } from "@/utils/deliveryDtdc";
import { makePayment } from "@/utils/payment";
import { StartOutlined } from "@mui/icons-material";

interface PayProps {
  name: string;
  amount: number;
  mobile: string;
}

interface PaymentPayload {
  merchantId: string;
  merchantTransactionId: string;
  merchantUserId: string;
  amount: number;
  redirectUrl: string;
  redirectMode: string;
  callbackUrl: string;
  mobileNumber: string;
  paymentInstrument: {
    type: string;
  };
}

const CheckoutPage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    // cardName: "",
    // cardNumber: "",
    // expirationDate: "",
    // cvc: "",
    company: "",
    adress: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    orderNotice: "",
  });
  const { products, total, clearCart } = useProductStore();
  const router = useRouter();
  // const makePayment = async (
  //   mobile: string,
  //   total: number,
  //   orderId: string
  // ) => {
  //   // const transactionId = "Tr-" + uuidv4().toString(36).slice(-6);
  //   const transactionId = orderId;
  //   //transaction id will be order id for us
  //   const payload: PaymentPayload = {
  //     merchantId: `${process.env.NEXT_PUBLIC_MERCHANT_ID }`,
  //     merchantTransactionId: transactionId,
  //     // merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
  //     merchantUserId: "MUID-" + uuidv4().slice(-6),
  //     amount: total,
  //     redirectUrl: `${process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL}/api/status/${transactionId}`,
  //     redirectMode: "POST",
  //     callbackUrl: `${process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL}/api/status/${transactionId}`,
  //     mobileNumber: mobile,
  //     paymentInstrument: { type: "PAY_PAGE" },
  //   };

  //   const dataPayload = JSON.stringify(payload);
  //   const dataBase64 = Buffer.from(dataPayload).toString("base64");

  //   const fullURL =
  //     dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
  //   const dataSha256 = sha256(fullURL);
  //   const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

  //   const UAT_PAY_API_URL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL +  "/pg/v1/pay";

  //   // const UAT_PAY_API_URL =
  //   //   "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

  //   try {
  //     const response = await axios.post(
  //       UAT_PAY_API_URL,
  //       { request: dataBase64 },
  //       {
  //         headers: {
  //           accept: "application/json",
  //           "Content-Type": "application/json",
  //           "X-VERIFY": checksum,
  //         },
  //       }
  //     );

  //     const redirectUrl =
  //       response.data.data.instrumentResponse.redirectInfo.url;
  //     router.push(redirectUrl);
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //   }
  // };
  const addOrderProduct = async (
    orderId: string,
    productId: string,
    productQuantity: number
  ) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order-product`, {
      // const response = await fetch(`${ENDPOINT.BASE_URL}/api/order-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerOrderId: orderId,
          productId,
          quantity: productQuantity,
        }),
      });
      if (!response.ok) throw new Error("Failed to add order product");
    } catch (error) {
      console.error("Error adding order product:", error);
    }
  };
  const createOrder = async () => {
    if (
      checkoutForm.name.length > 0 &&
      checkoutForm.lastname.length > 0 &&
      checkoutForm.phone.length > 0 &&
      checkoutForm.email.length > 0 &&
      // checkoutForm.cardName.length > 0 &&
      // checkoutForm.expirationDate.length > 0 &&
      // checkoutForm.cvc.length > 0 &&
      checkoutForm.company.length > 0 &&
      checkoutForm.adress.length > 0 &&
      checkoutForm.apartment.length > 0 &&
      checkoutForm.city.length > 0 &&
      checkoutForm.country.length > 0 &&
      checkoutForm.postalCode.length > 0
    ) {
      if (checkoutForm.postalCode.length !== 6) {
        toast.error("Please Enter 6 digit valid pin code.");
        return;
      }
      if (!isValidNameOrLastname(checkoutForm.name)) {
        toast.error("You entered invalid format for name");
        return;
      }

      if (!isValidNameOrLastname(checkoutForm.lastname)) {
        toast.error("You entered invalid format for lastname");
        return;
      }

      if (!isValidEmailAddressFormat(checkoutForm.email)) {
        toast.error("You entered invalid format for email address");
        return;
      }

      // if (!isValidNameOrLastname(checkoutForm.cardName)) {
      //   toast.error("You entered invalid format for card name");
      //   return;
      // }

      // if (!isValidCardNumber(checkoutForm.cardNumber)) {
      //   toast.error("You entered invalid format for credit card number");
      //   return;
      // }

      // if (!isValidCreditCardExpirationDate(checkoutForm.expirationDate)) {
      //   toast.error(
      //     "You entered invalid format for credit card expiration date"
      //   );
      //   return;
      // }

      // if (!isValidCreditCardCVVOrCVC(checkoutForm.cvc)) {
      //   toast.error("You entered invalid format for credit card CVC or CVV");
      //   return;
      // }

      // sending API request for creating a order

      const response = fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/orders", {
      // const response = fetch(ENDPOINT.BASE_URL + "/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: checkoutForm.name,
          lastname: checkoutForm.lastname,
          phone: checkoutForm.phone,
          email: checkoutForm.email,
          company: checkoutForm.company,
          adress: checkoutForm.adress,
          apartment: checkoutForm.apartment,
          postalCode: checkoutForm.postalCode,
          status: "order initiated",
          total: total,
          city: checkoutForm.city,
          country: checkoutForm.country,
          orderNotice: checkoutForm.orderNotice,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const orderId: string = data.id;
          // for every product in the order we are calling addOrderProduct function that adds fields to the customer_order_product table
          //  naziya to call below on payment success
          for (let i = 0; i < products.length; i++) {
            let productId: string = products[i].id;
            addOrderProduct(orderId, products[i].id, products[i].amount);
          }
          return data;
        })
        .then((data) => {
          const orderId: string = data.id;

          setCheckoutForm({
            name: "",
            lastname: "",
            phone: "",
            email: "",
            // cardName: "",
            // cardNumber: "",
            // expirationDate: "",
            // cvc: "",
            company: "",
            adress: "",
            apartment: "",
            city: "",
            country: "",
            postalCode: "",
            orderNotice: "",
          });
          clearCart();
          makePayment(
            checkoutForm.phone,
            Number(Math.round(total + total / 5 + 5) * 100),
            orderId
          );

          // toast.success("Order created successfuly");

          // setTimeout(() => {
          //   router.push("/");
          // }, 1000);
        });
    } else {
      toast.error("You need to enter values in the input fields");
    }
  };
  useEffect(() => {
    if (session?.user?.email && !checkoutForm.email) {
      setCheckoutForm((prevForm: any) => ({
        ...prevForm,
        email: session?.user?.email,
      }));
    }
  }, [session, checkoutForm.email]);
  useEffect(() => {
    if (products.length === 0) {
      toast.error("You don't have items in your cart");
      router.push("/cart");
    }
  }, []);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);

  // const [serviceStatus, setServiceStatus] = useState<null | {
  //   status: string;
  //   // message: string;
  // }>(null);
  const [serviceStatus, setServiceStatus] = useState<string | null>(null);


  const handlePostalCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const postalCode = e.target.value;

    setCheckoutForm({
      ...checkoutForm,
      postalCode,
    });

    if (postalCode.length >= 6) {
      // Replace with the desired pin codes
      const orgPincode = "160036";
      const desPincode = checkoutForm.postalCode;

      
      const result = await checkPostalCodeService(orgPincode, postalCode); // Replace "160036" with orgPincode
      setServiceStatus(result.ZIPCODE_RESP?.[0]?.MESSAGE);
    } else {
      setServiceStatus(null);
    }
  };

  return (
    <div className="bg-white">
      <SectionTitle title="Checkout" path="Home | Cart | Checkout" />
      {/* Background color split screen for large screens */}
      <div
        className="hidden h-full w-1/2 bg-white lg:block"
        aria-hidden="true"
      />
      <div
        className="hidden h-full w-1/2 bg-gray-50 lg:block"
        aria-hidden="true"
      />

      <main className="relative mx-auto grid max-w-screen-2xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
            >
              {products.map((product) => (
                <li
                  key={product?.id}
                  className="flex items-start space-x-4 py-6"
                >
                  <Image
                    src={`/${product?.image}`}
                    // src={`product?.image ? /${product?.image} : "/product_placeholder.jpg"`}
                    alt="product image"
                    width={80}
                    height={80}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3>{product?.title}</h3>
                    <p className="text-gray-500">
                      <strong>Quantity :</strong>
                      {product?.amount}
                    </p>
                  </div>
                  <p className="flex-none text-base font-medium">
                    ₹{product?.salePrice} X {product?.amount}
                  </p>
                  <p></p>
                </li>
              ))}
            </ul>

            <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd>₹{total}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd>₹5</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Taxes</dt>
                <dd>₹{total / 5}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">
                  ₹{total === 0 ? 0 : Math.round(total + total / 5 + 5)}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {sessionStatus == "authenticated" ? (
          <form className="px-4 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0">
            <div className="mx-auto max-w-lg lg:max-w-none">
              <section aria-labelledby="contact-info-heading">
                <h2
                  id="contact-info-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Contact information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label
                      htmlFor="name-input"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        value={checkoutForm.name}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            name: e.target.value,
                          })
                        }
                        type="text"
                        id="name-input"
                        name="name-input"
                        autoComplete="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lastname-input"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Lastname
                    </label>
                    <div className="mt-1">
                      <input
                        value={checkoutForm.lastname}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            lastname: e.target.value,
                          })
                        }
                        type="text"
                        id="lastname-input"
                        name="lastname-input"
                        autoComplete="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone-input"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        value={checkoutForm.phone}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            phone: e.target.value,
                          })
                        }
                        type="tel"
                        id="phone-input"
                        name="phone-input"
                        autoComplete="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        readOnly
                        value={checkoutForm.email}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            email: e.target.value,
                          })
                        }
                        type="email"
                        id="email-address"
                        name="email-address"
                        autoComplete="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 
            <section aria-labelledby="payment-heading" className="mt-10">
              <h2
                id="payment-heading"
                className="text-lg font-medium text-gray-900"
              >
                Payment details
              </h2>

              <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                <div className="col-span-3 sm:col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={checkoutForm.cardName}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          cardName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-4">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={checkoutForm.cardNumber}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          cardNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={checkoutForm.expirationDate}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          expirationDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC or CVV
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={checkoutForm.cvc}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          cvc: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </section> */}

              <section aria-labelledby="shipping-heading" className="mt-10">
                <h2
                  id="shipping-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Shipping address
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State/Company
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={checkoutForm.company}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            company: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={checkoutForm.adress}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            adress: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apartment, suite, etc.
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={checkoutForm.apartment}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            apartment: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={checkoutForm.city}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="region"
                        name="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={checkoutForm.country}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            country: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code.
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postal-code"
                        name="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={checkoutForm.postalCode}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            postalCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div> */}

                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal Code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postal-code"
                        name="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={checkoutForm.postalCode}
                        onChange={handlePostalCodeChange}
                      />
                      
                    </div>
                    {serviceStatus=="SUCCESS" ?<>
                   
                    <span className="ml-2 text-green-600 text-sm">
                    *Service Available
                  </span>
                      
                       </>
                   :
                    <span className="ml-2 text-red-600 text-sm">
                    {serviceStatus}
                  </span>
                   }
                    
              
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="order-notice"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Order notice
                    </label>
                    <div className="mt-1">
                      <textarea
                        className="textarea textarea-bordered textarea-md w-full"
                        id="order-notice"
                        name="order-notice"
                        autoComplete="order-notice"
                        value={checkoutForm.orderNotice}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            orderNotice: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-1  pt-6 ml-0">
                <button
                  type="button"
                  onClick={createOrder}
                  className="w-full rounded-md border border-transparent bg-orange-600 px-20 py-2 text-lg font-medium text-black shadow-sm hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </form>
        ) : isRegistered ? (
          <Login
            onLogin={() => {
              setIsRegistered(false);
            }}
            onRegister={() => {
              setIsRegistered(true);
            }}
            setIsRegistered={setIsRegistered}
          />
        ) : (
          <Register
            onRegister={() => {
              setIsRegistered(true);
            }}
            onLogin={() => {
              setIsRegistered(false);
            }}
            setIsRegistered={setIsRegistered}
          />
        )}
      </main>
    </div>
  );
};

export default CheckoutPage;
