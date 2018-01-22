module.exports.validateLoginData = (data) => {
    if (data.hasOwnProperty('email') && data.hasOwnProperty('password') && Object.keys(data).length === 2) {
        return true;
    } else {
        return false;
    }
}

module.exports.validateRegisterData = (data) => {

    if (data.hasOwnProperty('email') && data.hasOwnProperty('password') && Object.keys(data).length === 2) {
        return true;
    } else {
        return false;
    }
}





module.exports.validatePersonalDetail = (data) => {
    if (data.hasOwnProperty('gender') &&
        data.hasOwnProperty('firstname') &&
        data.hasOwnProperty('phone') &&
        data.hasOwnProperty('lastname') &&
        data.hasOwnProperty('day') &&
        data.hasOwnProperty('month') &&
        data.hasOwnProperty('year') &&
        Object.keys(data).length === 7
    ) {
        return true;
    } else {
        return false;

    }
}


module.exports.validateAddress = (data) => {
    let valid = false;
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty('address') &&
                data[i].hasOwnProperty('indication') &&
                data[i].hasOwnProperty('region') &&
                data[i].hasOwnProperty('state') &&
                data[i].hasOwnProperty('code') &&
                data[i].hasOwnProperty('default') &&
                Object.keys(data[i]).length === 6
            ) {
                valid = true;
            } else {
                return false;

            }
        }
        if (valid) {
            return true;
        }
    } else {
        return false;
    }


}