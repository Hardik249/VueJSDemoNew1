export const check_plural = (number, word) => {
    if(number <= 1) {
        return word
    }
    else{
        return word+'s'
    }
}

export const check_number = (number) => {
    if(number < 10 && number > 0) {
        return parseInt('0' + number)
        
    }
    else{
        return number
    }
}

export const check_mail = (mail) => {
    if(mail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)) {
        return true
    }
    else {
        return false
    }
}

export const check_max_price = (tab) => {
    let max_price = tab[0].price
    for (const item of tab) {
        if (max_price < item.price) {
            max_price = item.price
        }
    }
    return max_price
}

/* Element is a object  */
export const element_index_in_array = (array, element) => {
    /* console.log(array) */
    // console.log('export', array)

    // const array_mapped = array.map(e => e.item.id)
    // return array_mapped.indexOf(element.item.id)

    if (!localStorage.jwtToken) {
        const array_mapped = array.map(e => e.item.id)
        // return array_mapped.indexOf(element.item.id)
        let item = element.item ? element.item.id : element.id;
        return array_mapped.indexOf(item)
    } else {
     // console.log('e_', array)
     // console.log('e_e', element)
     // console.log('a_', array.map(e => e.id))
     // console.log('a_i', array.map(e => e.id).indexOf(element.id))
        const array_mapped = array.map(e => e.id)
        return array_mapped.indexOf(element.id)
    }
}

export const hide_long_text = (text) => {
    let final_word = ''
    for (let i = 0; i < 18; i++) {
        final_word += text[i]
    }
    final_word += '...'
    return final_word
}