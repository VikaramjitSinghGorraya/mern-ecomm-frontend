import axios from 'axios'

export const getProducts = sortBy => (
    axios.get(`https://myecommstore.herokuapp.com/api/products?sortBy=${sortBy}&order=desc`)
        .then(res => {return res.data})
        .catch(err => {return err})
    );

export const read = productId => (
    axios.get(`https://myecommstore.herokuapp.com/api/product/${productId}`)
            .then(res => {return res.data})
            .catch(err => {return err})
)

export const listRelated = productId => (
    axios.get(`https://myecommstore.herokuapp.com/api/product/related/${productId}`)
            .then(res => {return res.data})
            .catch(err => {return err})
)

export const getCategory = () => (
    axios.get('https://myecommstore.herokuapp.com/api/categories')
        .then(res => {return res.data})
        .catch(err => {return err})
)

export const getBraintreeClientToken = (userId, token) => (
    axios.get(`https://myecommstore.herokuapp.com/api/braintree/getToken/${userId}`, { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {return res.data})
        .catch(err => {return err})
)

export const processPayment = (userId, token, paymentData) => (
    axios.post(`https://myecommstore.herokuapp.com/api/stripe/payment/${userId}`,paymentData,{ headers: { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}` } })
        .then(res => {return JSON.parse( res.config.data).token.card})
        .catch(err => {return err})
)

export const createOrder = (userId, token, createOrderData) => (

    axios.post(`https://myecommstore.herokuapp.com/api/order/create/${userId}`, {order: createOrderData}, { headers: { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}` } })
        .then(res => {return res.data})
        .catch(err => {return err})
)

export const getOrders  = (userId) =>(
    axios.get(`https://myecommstore.herokuapp.com/api/order/list/${userId}`, { headers: { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}` } })
        .then(res => {return res.data})
        .catch(err => {return err})
)

export const getOrderDetails  = (orderId) =>(
    axios.get(`https://myecommstore.herokuapp.com/api/order/list/${orderId}`, { headers: { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}` } })
        .then(res => {return res.data})
        .catch(err => {return err})
)