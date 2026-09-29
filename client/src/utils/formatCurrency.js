const formatCurrency = (price) => {

    return "$" + Number(price).toLocaleString();

}

export default formatCurrency;