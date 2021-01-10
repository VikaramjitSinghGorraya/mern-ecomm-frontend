import axios from 'axios'

export const getProducts = sortBy => (
    axios.get(`http://localhost:4000/api/products?sortBy=${sortBy}&order=desc`)
        .then(res => {return res.data})
        .catch(err => {return err})
    );

export const read = productId => (
    axios.get(`http://localhost:4000/api/product/${productId}`)
            .then(res => {return res.data})
            .catch(err => {return err})
)

export const listRelated = productId => (
    axios.get(`http://localhost:4000/api/product/related/${productId}`)
            .then(res => {return res.data})
            .catch(err => {return err})
)

export const getCategory = () => (
    axios.get('http://localhost:4000/api/categories')
        .then(res => {return res.data})
        .catch(err => {return err})
)

// export const getToken = () =>{
//     if(sessionStorage.getItem('token')){
//         const config = {header:{"Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}`}} 
//         return config
//     }
//     return ''
// }

export const getBraintreeClientToken = (userId, token) => (
    axios.get(`http://localhost:4000/api/braintree/getToken/${userId}`, { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {return res.data})
        .catch(err => {return err})
)

export const processPayment = (userId, token, paymentData) => (
    axios.post(`http://localhost:4000/api/stripe/payment/${userId}`,paymentData,{ headers: { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}` } })
        .then(res => {return JSON.parse( res.config.data).token.card})
        .catch(err => {return err})
)

export const createOrder = (userId, token, createOrderData) => (

    axios.post(`http://localhost:4000/api/order/create/${userId}`, {order: createOrderData}, { headers: { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}` } })
        .then(res => {return res.data})
        .catch(err => {return err})
)

export const getOrders  = (userId) =>(
    axios.get(`http://localhost:4000/api/order/list/${userId}`, { headers: { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}` } })
        .then(res => {return res.data})
        .catch(err => {return err})
)

export const getOrderDetails  = (orderId) =>(
    axios.get(`http://localhost:4000/api/order/list/${orderId}`, { headers: { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}` } })
        .then(res => {return res.data})
        .catch(err => {return err})
)