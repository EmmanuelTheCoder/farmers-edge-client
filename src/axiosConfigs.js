import axios from 'axios';
import { toast } from 'react-toastify'

const BASE_URL = 'http://localhost:8000';

const config = {     
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

// axios config for get requests
export const axiosGet = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// handles redirection after registe and password reset http requests
export const timeOut=()=> {
  setTimeout(() => window.location.href='/login', 5000);
  clearTimeout();
}

// consume login API endpoint
export const LoginUser = (email, password) => {
  const data = {
    email: email,
    password: password
  }
  axios.post(`${BASE_URL}/auth/v1/login/`, data)
    .then(res => {  
    const token = res.data.token;
    const typeOfUser = res.data.user.typeUser;
    const username = res.data.user.userName;
    
    localStorage.setItem('userToken', token);
    localStorage.setItem('userType', typeOfUser);
    localStorage.setItem('username', username);

    if (typeOfUser === 'farmer') {
      window.location.href = '/farmers';

    } else if (typeOfUser === 'customer') {
      window.location.href = '/customers';
    }
})
  .catch(err => console.log(err))
}

// consume register API enpoint
export const SignUp = (
  firstName, surname, 
  username, email, 
  password, location, 
  phoneNumber, idNumber, 
  typeUser) => {

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('surname', surname);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('location', location);
    formData.append('phoneNumber', phoneNumber);
    formData.append('idNumber', idNumber);
    formData.append('typeUser', typeUser);

  axios.post(`${BASE_URL}/auth/v1/register/`, formData, config)
    .then(res => {  
      toast.success(
        'You have successfully created an account, please check your email to verify your account.'
        );
  })
 // .catch(err => console.log(err))

 timeOut();
}

// consume contact API endpoint
export const ContactUs = (name, email, subject, message) => {
  const data = {
    name: name,
    email: email,
    subject: subject,
    message: message
  }

  axios.post(`${BASE_URL}/api/v1/contact/`, data)
    .then(res => {

        window.location.href = '/contact';
    })

}

// consume market API endpoint(farm product)
export const cropItem = (
  retailerEmail, product, 
  totalCost, quantity, ready) => {

    const data = {
     retailerEmail:retailerEmail,
     product:product,
     totalCost:totalCost,
     quantity:quantity,
     ready:ready
    }

  // create food product with order
  axios.post(`${BASE_URL}/api/v1/farmer/product/`, data)
    .then(res => {

        window.location.href = '/farmers';
    })
}

// Fetch food product
export const getProducts = async () => {
  const url = `/api/v1/farmer/product/list`;
  const data = await axiosGet
  .request({ 
    method: 'get', 
    url: url })
  return data 
}

// consume market API endpoint(customer order)
export const placeOrder = (productName, totalCost, quantity, waitTime) => {
  const data = {
    productName: productName,
    totalCost: totalCost,
    quantity: quantity,
    waitTime: waitTime
  }

  // create order
  axios.post(`${BASE_URL}/api/v1/retailer/order/`, data)
    .then(res => {

        window.location.href = '/customers';
    })
}

// Fetch orders
export const getOrders = async () => {
  const url = `/api/v1/retailer/order/list`;
  const data = await axiosGet
  .request({
    method:'get',
    url: url
  })
  console.log(data);
  return data   
}

// consume reset password API endpoint
export const ResetPassword = (email) => {
  const data = {
    email:email,
  }

  axios.post(`${BASE_URL}/auth/v1/request/`, data)
    .then(res => {

      toast.success(
        'Password reset request sent, please check your email to reset password.'
        );
    })

  timeOut(); 
}

// get username
// export const getUserData = () => {
//   axios.get(`${BASE_URL}/auth/v1/user/`)
//     .then( res => res.data)
// }