<template>
    <div class="home">
        <navbar></navbar>
        <topbar></topbar>
    </div>
    <div style="margin-top: 10%;">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-11 col-sm-10 col-md-10 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
                    <div class="card px-0 pt-4 pb-0 mt-3 mb-3">
                        <h2 id="heading">Sign Up Your User Account</h2>
                        <p>Fill all form field to go to next step</p>
                        <form id="msform" @submit.prevent="createOrder">
                            <!-- progressbar -->
                            <ul id="progressbar">
                                <li class="active" id="account"><strong>Account</strong></li>
                                <li id="personal"><strong>Personal</strong></li>
                                <li id="payment"><strong>Method</strong></li>
                                <li id="confirm"><strong>Finish</strong></li>
                            </ul>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                            </div> <br> <!-- fieldsets -->
                            <fieldset>
                                <!-- <div class="form-card">
                                    <div class="row">
                                        <div class="col-7">
                                            <h2 class="fs-title">Account Information:</h2>
                                        </div>
                                        <div class="col-5">
                                            <h2 class="steps">Step 1 - 4</h2>
                                        </div>
                                    </div> <label class="fieldlabels">Email: *</label> <input type="email" name="email" placeholder="Email Id" /> <label class="fieldlabels">Username: *</label> <input type="text" name="uname" placeholder="UserName" /> <label class="fieldlabels">Password: *</label> <input type="password" name="pwd" placeholder="Password" /> <label class="fieldlabels">Confirm Password: *</label> <input type="password" name="cpwd" placeholder="Confirm Password" />
                                </div>  -->
                                <!-- {{ address }} -->
                                <div class="addresscard">
                                    <h2>Address</h2>
                                    <div id="addressDetails" v-for="(item, index) in address">
                                        <div :id="'addressbox-'+index" class="addressbox mt-2">
                                            <div class="left">
                                                <input type="radio" name="address" :id="'address-'+index" class="addressVal" :value="item.id">
                                            </div>
                                            <div class="right">
                                                <label :for="'address-'+index">
                                                    <!-- {{item}} -->
                                                    {{item.user.name}} ,<br />
                                                    {{item.address}}, 
                                                    {{item.state}}, 
                                                    {{item.city}}, 
                                                    {{item.zip}}, <br />
                                                    {{item.country}} <br />
                                                    <!-- Adam Johnson
                                                    403 Oakland Ave Street, A city, Florida, 32104,<br />
                                                    United States of America -->
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn address mt-2" id="addressAdd"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg> add your address 
                                    </button>
                                    <div class="col-50 hide addressForm" id="addressForm" style="display:none;">
                                        <!-- <h3>Billing Address</h3> -->
                                        <!-- <label for="fname"><i class="fa fa-user"></i> Full Name</label>
                                        <input type="text" id="fname" name="firstname" placeholder="John M. Doe">
                                        <label for="email"><i class="fa fa-envelope"></i> Email</label>
                                        <input type="text" id="email" name="email" placeholder="john@example.com"> -->
                                        <label for="address"><i class="fa fa-address-card-o"></i> Address</label>
                                        <input type="text" id="address" name="address" placeholder="542 W. 15th Street">
                                        <span class="error" id="addressError"></span><br>
                                        <label for="country"><i class="fa fa-institution"></i> Country</label>
                                        <input type="text" id="country" name="country" placeholder="Country">
                                        <span class="error" id="countryError"></span><br>
                                        
                                        <label for="state">State</label>
                                        <input type="text" id="state" name="state" placeholder="NY">
                                        <span class="error" id="stateError"></span><br>

                                        <label for="city"><i class="fa fa-institution"></i> City</label>
                                        <input type="text" id="city" name="city" placeholder="New York">
                                        <span class="error" id="cityError"></span><br>

                                        <label for="zip">Zip</label>
                                        <input type="text" id="zip" name="zip" placeholder="10001">
                                        <span class="error" id="zipError"></span><br>
                                    
                                        <!-- <div class="row">
                                          <div class="col-50">
                                          </div>

                                          <div class="col-50">
                                          </div>
                                        </div> -->
                                        <button type="button" class="btn" id="saveAddress">save</button>
                                    </div>
                                        <span class="success fade-in" id="successmsg"></span><br>
                                    <button type="button" class="btn" id="addressFormRemove" style="display:none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg> select from above address 
                                    </button>
                                </div>
                                <span for="address" generated="true" class="help-block"></span>
                                <!-- <span class="error" id="selectAddressError"></span><br> -->
                                <input type="button" name="next" class="next action-button" value="Next" />
                            </fieldset>
                            <fieldset>
                                <div class="form-card personal-details">
                                    <div class="row">
                                        <div class="col-7">
                                            <h2 class="fs-title">Personal Information:</h2>
                                        </div>
                                        <div class="col-5">
                                            <h2 class="steps">Step 2 - 4</h2>
                                        </div>
                                    </div> 
                                    <label class="fieldlabels">First Name: *</label> 
                                    <input type="text" name="firstName" placeholder="First Name" /> 
                                    <span for="firstName" generated="true" class="help-block error" id="firstNameError"></span><br>
                                    <label class="fieldlabels">Last Name: *</label> 
                                    <input type="text" name="lastName" placeholder="Last Name" /> 
                                    <span for="lastName" generated="true" class="help-block error" id="lastNameError"></span><br>
                                    <label class="fieldlabels">Contact No.: *</label> 
                                    <input type="text" name="contact" placeholder="Contact No." /> 
                                    <span for="contact" generated="true" class="help-block error" id="contactError"></span><br> 
                                    <label class="fieldlabels">Alternate Contact No.: *</label> 
                                    <input type="text" name="phno_2" placeholder="Alternate Contact No." />
                                </div> 
                                <input type="button" name="next" class="next action-button" value="Next" /> 
                                <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                            </fieldset>
                            <fieldset>
                                <div class="form-card">
                                    <div class="row">
                                        <div class="col-7">
                                            <h2 class="fs-title">
                                                <!-- Image Upload: -->
                                                Select Payment Method
                                            </h2>
                                        </div>
                                        <div class="col-5">
                                            <h2 class="steps">Step 3 - 4</h2>
                                        </div>
                                    </div> 
                                    <label class="fieldlabels">
                                        <!-- Upload Your Photo: -->
                                            Select Payment Method
                                    </label>
                                    <div class="addressbox mt-2">
                                        <input type="radio" id="razorpay" name="payment" value="razorpay">
                                        <label for="razorpay">Razorpay</label><br>
                                    </div>
                                    <div class="addressbox mt-2">
                                        <input type="radio" id="goolepay" name="payment" value="goolepay">
                                        <label for="goolepay">goolepay</label><br>
                                    </div>
                                    <div class="addressbox mt-2">
                                        <input type="radio" id="upi" name="payment" value="upi">
                                        <label for="upi">upi</label><br>
                                    </div>
                                    <div class="addressbox mt-2">
                                        <input type="radio" id="netbanking" name="payment" value="netbanking">
                                        <label for="netbanking">netbanking</label>
                                    </div>
                                    <!-- <input type="file" name="pic" accept="image/*"> <label class="fieldlabels">Upload Signature Photo:</label> <input type="file" name="pic" accept="image/*"> -->
                                </div> 
                                <span for="payment" generated="true" class="help-block"></span>
                                <span class="error" id="selectPaymentError"></span><br>
                                <input type="submit" name="next" class="next submit action-button" value="Submit" />
                                <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                            </fieldset>
                            <fieldset>
                                <div class="form-card">
                                    <div class="row">
                                        <div class="col-7">
                                            <h2 class="fs-title">Finish:</h2>
                                        </div>
                                        <div class="col-5">
                                            <h2 class="steps">Step 4 - 4</h2>
                                        </div>
                                    </div> <br><br>
                                    <div id="razorpayForm" style="display:none;">
                                      <form>
                                        <div>
                                          <input type="number" v-model="amount" />
                                          <input type="text" v-model="currency" />

                                          <button id="rzp-button1" type="button" class="btn">Create Order</button>
                                        </div>
                                      </form>
                                    </div>
                                  <div id="successMessage" style="display:none;">
                                    <h2 class="purple-text text-center"><strong>SUCCESS !</strong></h2> <br>
                                    <div class="row justify-content-center">
                                        <div class="col-3"> <img src="https://i.imgur.com/GwStPmg.png" class="fit-image"> </div>
                                    </div> <br><br>
                                    <div class="row justify-content-center">
                                        <div class="col-7 text-center">
                                            <h5 class="purple-text text-center">You Have Successfully Signed Up</h5>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                                <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>


<style scoped>
* {
    margin: 0;
    padding: 0
}

html {
    height: 100%
}

p {
    color: grey
}

#heading {
    text-transform: uppercase;
    color: #673AB7;
    font-weight: normal
}

#msform {
    text-align: center;
    position: relative;
    margin-top: 20px
}

#msform fieldset {
    background: white;
    border: 0 none;
    border-radius: 0.5rem;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding-bottom: 20px;
    position: relative
}

.form-card {
    text-align: left
}

#msform fieldset:not(:first-of-type) {
    display: none
}

#msform input,
#msform textarea {
    padding: 8px 15px 8px 15px;
    border: 1px solid #ccc;
    border-radius: 0px;
    margin-bottom: 25px;
    margin-top: 2px;
    width: 100%;
    box-sizing: border-box;
    font-family: montserrat;
    color: #2C3E50;
    background-color: #ECEFF1;
    font-size: 16px;
    letter-spacing: 1px
}

#msform input:focus,
#msform textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #673AB7;
    outline-width: 0
}

#msform .action-button {
    width: 100px;
    background: #673AB7;
    font-weight: bold;
    color: white;
    border: 0 none;
    border-radius: 0px;
    cursor: pointer;
    padding: 10px 5px;
    margin: 10px 0px 10px 5px;
    float: right
}

#msform .action-button:hover,
#msform .action-button:focus {
    background-color: #311B92
}

#msform .action-button-previous {
    width: 100px;
    background: #616161;
    font-weight: bold;
    color: white;
    border: 0 none;
    border-radius: 0px;
    cursor: pointer;
    padding: 10px 5px;
    margin: 10px 5px 10px 0px;
    float: right
}

#msform .action-button-previous:hover,
#msform .action-button-previous:focus {
    background-color: #000000
}

.card {
    z-index: 0;
    border: none;
    position: relative
}

/*.card {
    background-color: white;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 30px;
    margin: 10px;
    position: relative;
}*/

/*.card {
    margin: 20px 0px;
    padding: 20px 30px;
    border-left: 2px solid var(--secondary);
    background-color: white;
    display: grid;
    grid-template-columns: 60% 30%;
}*/

.addressbox {
    border: 1px solid #ccc;
    border-radius: 10px;
}

.addressForm {
    border: 1px solid #ccc;
    border-radius: 10px;
}

.center {
    padding: 0px 40px;
}

.center p {
    padding-bottom: 10px;
}

/*.right,*/
.left {
    margin-right: 90%;
}

.right {

}

.help-block {
    color:red !important;
}

.error {
    color:red;
}

.success{
    color: green;
}

.fs-title {
    font-size: 25px;
    color: #673AB7;
    margin-bottom: 15px;
    font-weight: normal;
    text-align: left
}

.purple-text {
    color: #673AB7;
    font-weight: normal
}

.steps {
    font-size: 25px;
    color: gray;
    margin-bottom: 10px;
    font-weight: normal;
    text-align: right
}

.fieldlabels {
    color: gray;
    text-align: left
}

#progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    color: lightgrey
}

#progressbar .active {
    color: #673AB7
}

#progressbar li {
    list-style-type: none;
    font-size: 15px;
    width: 25%;
    float: left;
    position: relative;
    font-weight: 400
}

#progressbar #account:before {
    font-family: FontAwesome;
    content: "\f13e"
}

#progressbar #personal:before {
    font-family: FontAwesome;
    content: "\f007"
}

#progressbar #payment:before {
    font-family: FontAwesome;
    content: "\f030"
}

#progressbar #confirm:before {
    font-family: FontAwesome;
    content: "\f00c"
}

#progressbar li:before {
    width: 50px;
    height: 50px;
    line-height: 45px;
    display: block;
    font-size: 20px;
    color: #ffffff;
    background: lightgray;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    padding: 2px
}

#progressbar li:after {
    content: '';
    width: 100%;
    height: 2px;
    background: lightgray;
    position: absolute;
    left: 0;
    top: 25px;
    z-index: -1
}

#progressbar li.active:before,
#progressbar li.active:after {
    background: #673AB7
}

.progress {
    height: 20px
}

.progress-bar {
    background-color: #673AB7
}

.fit-image {
    width: 100%;
    object-fit: cover
}

.fade-in {
  opacity: 1;
  transition: opacity 0.5s ease-in;
}

.fade-out {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}

</style>


<script setup>
import navbar from '@/components/navbar.vue';
import topbar from '@/components/topbar.vue';
import { onMounted, ref, provide } from 'vue';
import { useCart } from '@/store/cart.store.js'
import modalCart from '@/components/Cart/modalCart.vue';
import { element_index_in_array } from '@/services/utils/utils'

let address = ref([]);
const store_cart = useCart();
let amount = ref(`${store_cart.total_amount()}`);
let currency = ref('EUR');
let script = ref(`https://checkout.razorpay.com/v1/checkout.js`);

function loadRazorPay() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = script.value;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// async function createOrder() {
//   // Access the amount and currency properties
//   const orderData = {
//     amount: amount.value,
//     currency: currency.value,
//   };

//   // Make the API call to create the order
//   try {
//     const response = await axios.post('http://localhost:3001/api/orders/createorder/', orderData);
//     const { order_id, amount, currency, key } = response.data;

//     const razorpay = new Razorpay({
//       key: key,
//       amount: amount,
//       currency: currency,
//       name: 'My Store',
//       // Add more options as needed
//     });

//     razorpay.on('payment.success', (payment_id) => {
//       // Handle the payment success event
//         loadRazorPay();
//     });

//     razorpay.open();
//   } catch (error) {
//     console.log(error);
//     // Handle the error
//   }
// }

onMounted(async () => {
    console.log('o')
    await axios
    .get(`http://localhost:3001/api/userAddress/userAddressList/${localStorage.id}`)
    .then(response => {
        // console.log('pymnt', response.data.data)
        address.value = response.data.data;
    });
    // const result = await loadRazorPay();
    // if (!result) {
    //   alert('Failed to load Razorpay script');
    //   return;
    // }
});
// async function mounted() {
//     const result = await this.loadRazorPay();
//     if (!result) {
//       alert('Failed to load Razorpay script');
//       return;
//     }
//   }
let getUserAddresses = async () => {
    await axios
    .get(`http://localhost:3001/api/userAddress/userAddressList/${localStorage.id}`)
    .then(response => {
        // console.log('pymnt', response.data.data)
        address.value = response.data.data;
    });
}

// console.log(store_cart.items.length);
if (store_cart.items.length != 0) {

    const deleteItem = (e) => {
        if (!localStorage.jwtToken) {
            store_cart.delete_item(element_index_in_array(JSON.parse(JSON.stringify(store_cart)).items, e))
        } else {
            console.log(e);
            axios
            .delete(`http://localhost:3001/api/carts/removefromcart/${e.id}`)
            .then(function(response) {
                store_cart.delete_item(element_index_in_array(JSON.parse(JSON.stringify(store_cart)).items, e))
            })
            .catch(function(error) {
                console.error(error)
            })
        }
    }

    $(document).ready(function(){

        $('#rzp-button1').click(async function(e){
          // Access the amount and currency properties
          const orderData = {
            amount: amount.value,
            currency: currency.value,
          };

          // Make the API call to create the order
          try {
            const response = await axios.post('http://localhost:3001/api/orders/createorder/', orderData);
            const { order_id, amount, currency, key } = response.data;

            const razorpay = new Razorpay({
              key: key,
              amount: amount,
              currency: currency,
              name: 'My Store',
              // Add more options as needed
                "handler": function (response){
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature);
                    $('#successMessage').css('display', '');
                    $('#razorpayForm').css('display', 'none');
                },
            });

            // "handler": function (response){
            //     alert(response.razorpay_payment_id);
            //     alert(response.razorpay_order_id);
            //     alert(response.razorpay_signature);
            //     $('#successMessage').css('display', '');
            //     $('#razorpayForm').css('display', 'none');
            // },

            // razorpay.on('payment.success', (payment_id) => {
            //   // Handle the payment success event
            //     $('#successMessage').css('display', '');
            //     $('#razorpayForm').css('display', 'none');
            //     loadRazorPay();
            // });

            // razorpay.on('payment.success', (payment_id) => {
            //   // Handle the payment success event
            //   $('#successMessage').css('display', 'block');
            //   $('#razorpayForm').css('display', 'none');
            //   loadRazorPay();
            // });

            razorpay.open();
          } catch (error) {
            console.log(error);
            // Handle the error
          }
        });

        $('#addressAdd').click(function() {
            // alert('ml')
            let inputs = window.document.getElementsByClassName('addressForm');
            inputs[0].childNodes[3].value = inputs[0].childNodes[7].value = inputs[0].childNodes[11].value = inputs[0].childNodes[15].value = inputs[0].childNodes[19].value = '';
            $('.success').html('')
            $('#addressForm').css('display', '');
            $('#addressFormRemove').css('display', '');
            $(this).css('display', 'none');
            $('.addressbox').css('display', 'none');
            // console.log(address)
            // $('#addressForm').reset();
            // console.log($('#addressForm'))
            // inputs[0].childNodes.forEach(function(key, value) {
            //     // console.log('k', key)
            //     // console.log('v', value)
            //     // console.log('kv', key[value].value)
            //     key[value].value = '';
            // })
            // address = country = state = city = zip = '';
        });

        $('#addressFormRemove').click(function() {
            $('.success').html('')
            $('#addressForm').css('display', 'none');
            $('#addressFormRemove').css('display', 'none');
            $(this).css('display', 'none');
            $('.addressbox').css('display', '');
            $('.address').css('display', '');
        });

        $('#saveAddress').click(function() {
            $('.success').html('')
            let inputs = window.document.getElementsByClassName('addressForm');
            // console.log(inputs[0].childNodes)
            let addressLine = inputs[0].childNodes[3].value ? inputs[0].childNodes[3].value : '';
            let country = inputs[0].childNodes[7].value ? inputs[0].childNodes[7].value : '';
            let state = inputs[0].childNodes[11].value ? inputs[0].childNodes[11].value : '';
            let city = inputs[0].childNodes[15].value ? inputs[0].childNodes[15].value : '';
            let zip = inputs[0].childNodes[19].value ? inputs[0].childNodes[19].value : '';

            // console.log(zip)
            // console.log(inputs[0].childNodes[8].childNodes[0].childNodes)
            // console.log(inputs[0].childNodes[8].childNodes[1].childNodes)

            // let state = inputs[0].childNodes[14].childNodes[0].childNodes[1].value ? inputs[0].childNodes[14].childNodes[0].childNodes[1].value : '';
            // let zip = inputs[0].childNodes[14].childNodes[1].childNodes[1].value ? inputs[0].childNodes[14].childNodes[1].childNodes[1].value : '';
            // console.log(address)
            // console.log(zip)
            // let email = inputs[0].childNodes[1].value ? inputs[0].childNodes[1].value : '';
            // let password = inputs[1].childNodes[1].value ? inputs[1].childNodes[1].value : '';
            let urlFormData = new URLSearchParams({
                address: addressLine, //gave the values directly for testing
                country: country, //gave the values directly for testing
                city: city, //gave the values directly for testing
                state: state, //gave the values directly for testing
                zip: zip, //gave the values directly for testing
                // password: password,
                // email: 'user-client'
            });

            // alert('s')
            axios
            .post(`http://localhost:3001/api/userAddress/addtouseraddress/${localStorage.id}`, urlFormData)
            .then(response => {
                $('.error').html('')
                $('.success').html('')
                // console.log('pymnt post', response.data)
                if (response.data.status == "address Validation Fail") {
                    if (response.data.path == "address") {
                        let addressError = response.data.path == 'address' ? response.data.message : '';
                        document.getElementById('addressError').append(addressError);
                    }
                    if (response.data.path == "country") {
                        let countryError = response.data.path == 'country' ? response.data.message : '';
                        document.getElementById('countryError').append(countryError);
                    }
                    if (response.data.path == "city") {
                        let cityError = response.data.path == 'city' ? response.data.message : '';
                        document.getElementById('cityError').append(cityError);
                    }
                    if (response.data.path == "state") {
                        let stateError = response.data.path == 'state' ? response.data.message : '';
                        document.getElementById('stateError').append(stateError);
                    }
                    if (response.data.path == "zip") {
                        let zipError = response.data.path == 'zip' ? response.data.message : '';
                        document.getElementById('zipError').append(zipError);
                    }
                }
                if (response.data.status == "success user address added") {
                    let successmsg = response.data.message ? response.data.message : '';
                    setTimeout(() => {
                      successMsg.classList.add('fade-out');
                    }, 2000); // 2000 milliseconds (2 seconds) delay

                    getUserAddresses();
                    $('#addressFormRemove').click();
                }
                // address.value = response.data.data;
            });
        });

        var current_fs, next_fs, previous_fs; //fieldsets
        var opacity;
        var current = 1;
        var steps = $("fieldset").length;

        setProgressBar(current);

        $(".next").click(async function(){
            $('.error').html('');

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            // console.log(modalCart);
            // console.log(store_cart.items);
            // let urlFormDataObj = new URLSearchParams({
            //     quantity: JSON.stringify(quantity), //gave the values directly for testing
            //     price: JSON.stringify(price), //gave the values directly for testing
            //     productId: JSON.stringify(productId), //gave the values directly for testing
            //     // addressId: addressId,
            // });
            // console.log(quantity);
            let inputs = window.document.getElementsByClassName('personal-details');
            // console.log(inputs[0].childNodes)
            let firstName = inputs[0].childNodes[2].value ? inputs[0].childNodes[2].value : '';
            let lastName = inputs[0].childNodes[6].value ? inputs[0].childNodes[6].value : '';
            let contact = inputs[0].childNodes[10].value ? inputs[0].childNodes[10].value : '';
            // let city = inputs[0].childNodes[8].value ? inputs[0].childNodes[8].value : '';
            let firstNameError, lastNameError, contactError;
            let id, orderId;
            // console.log('total', store_cart.total_amount());
            let total = store_cart.total_amount();
            let addressVal;
            if (address.value != undefined) {
                address.value.forEach(function(key, value) {
                    // console.log('addif', Object.values($('#address-'+value))[0].checked);
                    // console.log('ad-idval', $('#address-'+value).val());
                    // console.log('ad-idk', key.id);
                    // console.log(`${$('#address-'+value).val()} ${key.id}`);
                    addressVal = $('#address-'+value)[0] ? $('#address-'+value)[0] : '';
                    if (addressVal.checked == true) {
                        id = $('#address-'+value).val();
                    }
                });
            } else {
                $('#addressAdd').click();
            }
            let urlFormData = new URLSearchParams({
                firstName: firstName, //gave the values directly for testing
                lastName: lastName, //gave the values directly for testing
                contact: contact, //gave the values directly for testing
                addressId: id,
                total: total,
            });
            let form = $('#msform');
            form.validate({
                errorElement: 'span',
                errorClass: 'help-block',
                highlight: function(element, errorClass, validClass) {
                    $(element).closest('.form-group').addClass("has-error");
                },
                unhighlight: function(element, errorClass, validClass) {
                    $(element).closest('.form-group').removeClass("has-error");
                },
                rules: {
                    address: {
                        required: true,
                        // usernameRegex: true,
                        // minlength: 6,
                    },
                    firstName: {
                        required: true,
                    },
                    lastName: {
                        required: true,
                    },
                    contact: {
                        required: true,
                        // length: 10,
                        minlength: 10,
                        maxlength: 10,
                        pattern: /^\d+$/, // Regular expression to match numbers only
                    },
                    // payment: $('#selectPaymentError').append('Please Select Payment Method')
                    payment: {
                        required: true,
                        // required: $('#selectPaymentError').append('Please Select Payment Method')
                    },
                },
                messages: {
                    address: {
                        // required: "Address required",
                        required: "Please Select Address",
                    },
                    firstName: {
                        // required: "First Name required",
                        // required: $('#firstNameError').val(),
                        // required: firstNameError,
                        required: firstNameError ? firstNameError : "First Name required",
                    },
                    lastName: {
                        // required: "Last Name required",
                        // required: $('#lastNameError').val(),
                        // required: lastNameError,
                        required: lastNameError ? lastNameError : "Last Name required",
                    },
                    contact: {
                        // required: "Contact No. required",
                        // required: $('#contactError').val(),
                        // required: contactError,
                        required: contactError ? contactError : "Contact No. required",
                        pattern: contactError ? contactError : 'Please enter numbers only.',
                        // length: contactError ? contactError : "Contact No. must be 10 digits length",
                    },
                    // payment: $('#selectPaymentError').append('Please Select Payment Method')
                    payment: {
                        required: "Please Select Payment Method.",
                        // required: "",
                        // required: $('#selectPaymentError').append('Please Select Payment Method'),
                    },
                },
                // errorElement : 'div',
                // errorLabelContainer: '.errorTxt'
            });
            let isValid = true;
            for (var i = 0; i < 3; i++) {
                // console.log('sm', Object.values($("input[name='payment']"))[i].checked)
                if (Object.values($("input[name='payment']"))[i].checked == true) {
                    isValid = false;
                }
            }
            if (form.valid() === true) {
                // $("input[name='payment']")
                // console.log('submit', $("input[name='payment']"))
                // console.log('error', firstNameError ? firstNameError : "First Name required")
                // alert(opacity)
                next_fs.show();
                //hide the current fieldset with style
                current_fs.animate({opacity: 0}, {
                    step: function(now) {
                        // for making fielset appear animation
                        opacity = 1 - now;

                        current_fs.css({
                            'display': 'none',
                            'position': 'relative'
                        });
                        next_fs.css({'opacity': opacity});
                    },
                    duration: 500
                });
                // alert(current);
                setProgressBar(++current);
                if ($('input[name="payment"]:checked').val() == 'razorpay') {
                    $('#successMessage').css('display', 'none');
                    $('#razorpayForm').css('display', '');
                } else {
                    $('#successMessage').css('display', '');
                    $('#razorpayForm').css('display', 'none');
                }
                // console.log('tv', $(this).val());
                if ($(this).val() == 'Submit') {
                    let inputsPersonal = window.document.getElementsByClassName('personal-details');
                    // console.log('sbmt', inputsPersonal[0].childNodes)
                    let firstName = inputsPersonal[0].childNodes[2].value ? inputsPersonal[0].childNodes[2].value : '';
                    let lastName = inputsPersonal[0].childNodes[6].value ? inputsPersonal[0].childNodes[6].value : '';
                    let contact = inputsPersonal[0].childNodes[10].value ? inputsPersonal[0].childNodes[10].value : '';
                    // let city = inputs[0].childNodes[8].value ? inputs[0].childNodes[8].value : '';
                    let addressId;
                    address.value.forEach(function(key, value) {
                        if ($('#address-'+value).val() == key.id) {
                            addressId = key.id;
                        }
                    });
                    axios
                    .post(`http://localhost:3001/api/orders/addorder/${localStorage.id}`, urlFormData)
                    .then(response => {
                        $('.error').html('')
                        // console.log('pymnt post', response.data)
                        if (response.data.status == "order Validation Fail") {
                            // console.log('crnt', current_fs);
                            // current_fs.show();
                            // previous_fs.show();
                            // next_fs.hide();
                            if (response.data.path == "firstName") {
                                firstNameError = response.data.path == 'firstName' ? response.data.message : '';
                                document.getElementById('firstNameError').append(firstNameError);
                            }
                            if (response.data.path == "lastName") {
                                lastNameError = response.data.path == 'lastName' ? response.data.message : '';
                                document.getElementById('lastNameError').append(lastNameError);
                            }
                            if (response.data.path == "contact") {
                                contactError = response.data.path == 'contact' ? response.data.message : '';
                                document.getElementById('contactError').append(contactError);
                            }
                        }
                        orderId = response.data.data.id;
                        // console.log(orderId);
                        let quantity = [];
                        let productId = [];
                        let price = [];
                        axios
                        .get(`http://localhost:3001/api/carts/viewcarts/${localStorage.id}`)
                        .then(response => {
                            console.log('get', response.data.data)
                            for (var i = 0; i < response.data.data.length; i++) {
                                console.log(response.data.data[i])
                                quantity.push(response.data.data[i].quantity)
                                productId.push(response.data.data[i].productId)
                                price.push(response.data.data[i].product.price)
                            }
                            axios
                            .post(`http://localhost:3001/api/orderDetails/addorderDetails/${localStorage.id}`,{
                                'quantity': quantity,
                                'productId': productId,
                                'price': price,
                                'orderId': orderId,
                            })
                            .then(response => {
                                console.log('addorderDetails post', response.data)
                                if (response.data.length != 0) {
                                    store_cart.items.forEach(function(key, value) {
                                        // console.log(key);
                                        deleteItem(key);
                                    });
                                }
                            });

                            // response.data.data.forEach(function(key, value) {
                            //     // console.log('get', key, value)
                            //     quantity.push(key.quantity);
                            //     productId.push(key.productId);
                            //     price.push(key.product.price);
                            //     axios
                            //     .post(`http://localhost:3001/api/orderDetails/addorderDetails/${sessionStorage.id}`,{body:{quantity: key.quantity}})
                            //     .then(response => {
                            //         console.log('pymnt post', response.data)
                            //     });
                            // })
                        });
                    });
                    // console.log(formdata);
                    console.log($('input[name="payment"]:checked').val());
                    localStorage.paymentMethod = $('input[name="payment"]:checked').val();
                    // console.log(document.querySelector('input[name="payment"]:checked'));
                }
                // i++;
            } else {
                // $('#selectAddressError').append('Please Select Address');
                // console.log(current_fs.prev());
                // $(this).attr('disabled', true)
                // current_fs.show();
                // current_fs.prev().show();
                // $(".previous").click();
            }
            // console.log('vldtin', form.valid());
            previous_fs = $(this).parent().prev();
            // let index = 0;

            // console.log('prev', previous_fs);
            // console.log('addval', Object.values($('#address-'+index))[0].checked)
            // index++;
            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
            //show the next fieldset
            // console.log(address.value)
            // let id = 0;
            // if (opacity == 1) {
            // }
        });

        $(".previous").click(function(){

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            //Remove class active
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            previous_fs.show();

            //hide the current fieldset with style
            current_fs.animate({opacity: 0}, {
            step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
            'display': 'none',
            'position': 'relative'
            });
            previous_fs.css({'opacity': opacity});
            },
            duration: 500
            });
            setProgressBar(--current);

        });

        function setProgressBar(curStep){
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
        .css("width",percent+"%")
        }

        $(".submit").click(async function(){
            // createOrder();
            return false;
        })

    });
} else {
    window.location = '/';
}
</script>

