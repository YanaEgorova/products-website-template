import { products } from './data/products.js';
export const localStorage = (id, count) => {
    const actualProduct = products.find(product => product.id === id);
    let cart = window.localStorage.getItem('cart');
    // DEV
    var taskStatus
    if(actualProduct.type == "ring"){
        if(document.querySelector(".prod__select").value == "Select"){
            document.querySelector(".prod__select").focus()
            taskStatus = false
            alert("Select a ring size")
        } else {
            taskStatus = true
            actualProduct.ringSize = document.querySelector(".prod__select").value
        }
    }else if(actualProduct.type == "clothing"){
        if(document.querySelector(".prod__select").value == "Select"){
            document.querySelector(".prod__select").focus()
            taskStatus = false
            alert("Select your clothing size")
        } else {
            taskStatus = true
            actualProduct.clothingSize = document.querySelector(".prod__select").value
        }
    }
    if(taskStatus == false){
        return taskStatus
    }
    /////
    if(cart) {
        cart = JSON.parse(cart);
    // DEV
        var isFindProduct
        if(actualProduct.type == "ring"){
            isFindProduct = cart.some(product => product.id === id && product.ringSize == actualProduct.ringSize);
        }else if(actualProduct.type == "clothing"){
            isFindProduct = cart.some(product => product.id === id && product.clothingSize == actualProduct.clothingSize);
        } else {
            isFindProduct = cart.some(product => product.id === id);
        }
        if(isFindProduct) {
            // const updateCart = [...cart, {...actualProduct, quantity : count ? Number(count) : 1}];
            const updateCart = cart.map(product => product.id === id ? {...product, quantity : product.quantity + 1 } : product);
    //////            
            window.localStorage.setItem('cart', JSON.stringify(updateCart));
            return;
        }
        const updateCart = [...cart, {...actualProduct, quantity : count ? Number(count) : 1}];
        window.localStorage.setItem('cart', JSON.stringify(updateCart));
        return;
    };
    const createCart = [{...actualProduct, quantity : count ? Number(count) : 1}];
    window.localStorage.setItem('cart', JSON.stringify(createCart));
    return taskStatus
}

export const getLocalStorageItem = () => {
    let localStorageData = window.localStorage.getItem('cart');
    if(localStorageData) {
        return JSON.parse(localStorageData);
    }
    return [];
}

export const getCartFulfillment = () => {
    let localStorageData = window.localStorage.getItem('cart');
    if(localStorageData) {
        let rawData = JSON.parse(localStorageData);
        let formattedData = [];

        rawData.forEach(item => {
            let newItem = {name: item["name"], price: item["price"], quantity: item['quantity']};

            formattedData.push(newItem);
        })

        return formattedData;
    }
    return [];
}