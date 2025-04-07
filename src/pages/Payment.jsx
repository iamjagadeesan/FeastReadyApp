import React, { useState, useEffect, useContext} from "react";
import { FaCcAmazonPay } from "react-icons/fa";
import { TbCreditCardPay } from "react-icons/tb";
import { FaGooglePay } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { BiLogoPaypal } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
import OrderSuccess from "../components/OrderSuccess.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios'
import { RiErrorWarningFill } from "react-icons/ri";

const Payment = () => {
  const [loading,setLoading] = useState(false);
  const { totalAmt,url,token ,setCartItems} = useContext(StoreContext);
  const style = "p-1 px-2 placeholder:text-gray-200 bg-white/10 w-1/2 focus:outline-none border-2 border-green-500 focus:border-yellow-100 focus:border-b-yellow-300 focus:border-r-yellow-300 rounded-md focus:bg-green-900 focus:shadow-md focus:shadow-green-950 text-gray-100 w-full";
  const [pay, setPay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentApp, setPaymentApp] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    ccv: "",
    expMonth: "",
    expYear: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (paymentMethod === "UPI" && paymentApp !== "") {
      setPay(true);
    } else if (
      paymentMethod === "Card" &&
      paymentDetails.cardNumber.length === 4 &&
      paymentDetails.ccv.length === 3 &&
      paymentDetails.expMonth.length === 2 &&
      paymentDetails.expYear.length === 4
    ) {
      setPay(true);
    } else {
      setPay(false);
    }
  }, [paymentMethod, paymentApp, paymentDetails]);


  const verifyPayment = async () => {
    const response = await axios.post(url+"/api/order/verify",{success:true},{headers:{token}})
    if(response.data.success){
      setLoading(true);
      setCartItems({});
    }
    else{
      navigate("/");
    }
  }


  return (
    <div data-aos="flip-right" data-aos-duration="500" data-aos-offset="10" 
    className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 p-6">
      {loading && <OrderSuccess/>}
      <h2 className="text-4xl font-f font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 pb-2">
        Payment
      </h2>
      <form className="flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-green-700 via-green-800 to-green-900 shadow-lg p-6 rounded-lg w-full max-w-md text-yellow-300 font-e">
        <p className="text-lg font-semibold mb-4">Amount: ₹{totalAmt}</p>

        <p className="block text-lg font-medium text-gray-100">
          Select Payment Method
        </p>
        <div className="flex justify-evenly items-center gap-4 text-6xl text-gray-100 w-full py-2">
          <span
            onClick={() => setPaymentMethod("UPI")}
            className={`cursor-pointer px-2 py-1 ${
              paymentMethod === "UPI"
                ? "border-2 border-yellow-300 rounded-lg bg-green-700 shadow-md shadow-green-950"
                : ""
            }`}
          >
            <FaCcAmazonPay />
          </span>
          <span
            onClick={() => setPaymentMethod("Card")}
            className={`cursor-pointer px-2 py-1 ${
              paymentMethod === "Card"
                ? "border-2 border-yellow-300 rounded-lg bg-green-700 shadow-md shadow-green-950"
                : ""
            }`}
          >
            <TbCreditCardPay />
          </span>
        </div>

        {/* UPI Payment */}
        {paymentMethod === "UPI" && (
          <div className="mt-4">
            <p className="block text-lg font-medium text-center text-gray-100">
              Select UPI App
            </p>
            <div className="flex justify-evenly items-center gap-2 text-5xl text-gray-100 pt-2">
              <span
                onClick={() => setPaymentApp("Gpay")}
                className={`cursor-pointer px-2 py-1 ${
                  paymentApp === "Gpay"
                    ? "border-2 border-yellow-300 rounded-lg bg-green-700 shadow-md shadow-green-950"
                    : ""
                }`}
              >
                <FaGooglePay />
              </span>
              <span
                onClick={() => setPaymentApp("paytm")}
                className={`cursor-pointer px-2 py-1 ${
                  paymentApp === "paytm"
                    ? "border-2 border-yellow-300 rounded-lg bg-green-700 shadow-md shadow-green-950"
                    : ""
                }`}
              >
                <SiPaytm />
              </span>
              <span
                onClick={() => setPaymentApp("paypal")}
                className={`cursor-pointer px-2 py-1 ${
                  paymentApp === "paypal"
                    ? "border-2 border-yellow-300 rounded-lg bg-green-700 shadow-md shadow-green-950"
                    : ""
                }`}
              >
                <BiLogoPaypal />
              </span>
            </div>
          </div>
        )}

        {/* Card Payment */}
        {paymentMethod === "Card" && (
          <div className="mt-4 space-y-2 text-gray-100">
            <label className="block">Card Last 4 Digits:</label>
            <input
              required
              type="text"
              maxLength="4"
              className={style}
              placeholder="1234"
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cardNumber: e.target.value,
                })
              }
            />
            <label className="block">CCV:</label>
            <input
              required
              type="text"
              maxLength="3"
              className={style}
              placeholder="123"
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, ccv: e.target.value })
              }
            />
            <label className="block">Expiry Month:</label>
            <input
              required
              type="text"
              maxLength="2"
              className={style}
              placeholder="MM"
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, expMonth: e.target.value })
              }
            />
            <label className="block">Expiry Year:</label>
            <input
              required
              type="text"
              maxLength="4"
              className={style}
              placeholder="YYYY"
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, expYear: e.target.value })
              }
            />
          </div>
        )}

        {/* Pay Button (Hidden until conditions met) */}
        {pay && (
          <button
            className="cursor-pointer mt-6 w-full bg-yellow-300 text-green-800 font-sans font-bold border-2 border-yellow-400 shadow-md shadow-green-950 p-3 rounded-lg"
            onClick={(event)=>{event.preventDefault();verifyPayment();}}
          >
            Pay ₹{totalAmt}
          </button>
        )}
      </form>
      <div className={`opacity-80 place-content-end mt-10 text-red-600 flex items-center font-semibold px-2 py-1 rounded-lg bg-black`}><RiErrorWarningFill/> FeastReady's payment system is for educational purposes only—no real transactions occur, so do not enter actual UPI IDs or card details.</div>
    </div>
  );
};

export default Payment;
