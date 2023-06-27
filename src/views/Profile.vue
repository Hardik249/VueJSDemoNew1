<script>
import axios from 'axios'

export default {
  data() {
	console.log('name', localStorage.name)
	console.log('email', localStorage.email)
    return {
      // text: '',
      id: localStorage.id,
      name: localStorage.name,
      email: localStorage.email,
    };
  },
  mounted () {
    axios
    // .get('http://127.0.0.1:8000/api/auth/user-profile',{
    .get(`http://localhost:3001/api/users/getprofile/${localStorage.id}`,{
      mode: 'no-cors',
      headers: {
        Authorization : `Bearer ${localStorage.jwtToken}`
      }
    })
    .then(response => {
      console.log('response', response.data.data.name)
      this.name = response.data.data.name
      this.email = response.data.data.email
      // sessionStorage.jwtToken = response.data.access_token
      // sessionStorage.name = response.data.user.name
      // sessionStorage.email = response.data.user.email
      // sessionStorage.id = response.data.user.id
      // window.location = '/'
      // this.$router.push("/");
      // response.json().then(res => console.log(res));
    })
  },
  methods: {
    fetchData() {
      // let jwtToken = sessionStorage.jwtToken;
      // localStorage.jwtToken = sessionStorage.jwtToken;
      // alert('f')
	  // const response = await fetch("http://127.0.0.1:8000/api/auth/user-profile")
    // console.log('response', response)
	  console.log('this.email', this.email)
      const formData = new FormData()
      let name = this.name ? this.name : ''
      let email = this.email ? this.email : ''
      // let password = this.password ? this.password : ''
      // let roles = this.roles ? this.roles : ''
	  // console.log('roles', this.roles)
	  // console.log('selectroles', this.select)
      formData.append('name', name)
      formData.append('email', email)
      // formData.append('password', password)
      // formData.append('roles', roles)
      // axios.get('http://127.0.0.1:8000/api/auth/user-profile', {
      // axios.post(`http://127.0.0.1:8000/api/users/update/${sessionStorage.id}`, formData, {
       // {
       //    // method: 'GET',
       //    method: 'PUT',
       //    mode: 'no-cors',
       //    headers: {
       //    //   'Access-Control-Allow-Origin':'*',
       //      // Authorization : `Bearer ${sessionStorage.jwtToken}`
       //  		Authorization : `Bearer ${localStorage.jwtToken}`
       //      //   'x-rapidapi-host': 'random-facts2.p.rapidapi.com',
       //      //   'x-rapidapi-key': 'Your -RapidAPI-Hub-Key'
       //    },
       //  }
     let urlFormData = new URLSearchParams({
        name: name, //gave the values directly for testing
        email: email,
        // email: 'user-client'
      })
    console.log('urlFormData', urlFormData)
     axios.put(`http://localhost:3001/api/users/updateprofile/${localStorage.id}`, urlFormData)
      .then(response => {
          $('.error').html('')
          console.log('response', response.data)
          if (response.data.status == 'updateProfile Validation Fail') {
            let emailError = response.data.path == 'email' ? response.data.message : '';
            console.log(response.data.path == 'email')
            let passError = response.data.path == 'password' ? response.data.message : '';
            console.log(passError)

            document.getElementById('emailError').append(emailError);
            document.getElementById('passwordError').append(passError);

            // $('emailError').append(emailError);
            // $('passwordError').append(passError);
          }
          if (response.data.status == 'fail users login') {
            // document.getElementById('allErrors').append(error.response.data.error)
            $('#allErrors').append(response.data.message)
          }
          if (response.data.status == 'success users updateProfile') {
            // console.log('d', response.data)
            // console.log('n', response.data.data.name)
            // console.log('e', response.data.data.email)
            // alert(sessionStorage.jwtToken);
            // alert(localStorage.jwtToken);
            // alert(jwtToken);
            // console.log('a', sessionStorage.jwtToken);
            // console.log(response.data)
            // sessionStorage.jwtToken = response.data.auth
            // sessionStorage.jwtToken = sessionStorage.jwtToken
            sessionStorage.id = response.data.data.id
            sessionStorage.name = response.data.data.name
            sessionStorage.email = response.data.data.email
            window.location = '/';
            localStorage.id = response.data.data.id
            localStorage.name = response.data.data.name
            localStorage.email = response.data.data.email
          }
        // let message = response.data.message
        // // alert(message)
        // // window.location = '/'
        // sessionStorage.jwtToken = response.data.access_token
        // sessionStorage.name = response.data.user.name
        // sessionStorage.email = response.data.user.email
        // sessionStorage.id = response.data.user.id
        // window.location = '/'
        // this.$router.push("/");
        // response.json().then(res => console.log(res));
      })
      .catch(error => {
        console.log('erc', error.code);
        console.log('error response', error.response);
        if (error.response != undefined) {
          if (error.response.status == 422) {
            // alert('t')
            console.log('error response name', error.response.data);
            // let messages = JSON.parse(error.response.data)
            // errors = JSON.parse(error.response.data)
            let nameError = error.response.data.name ? error.response.data.name : ''
            let emailError = error.response.data.email ? error.response.data.email : ''
            $('.error').html('')
            document.getElementById('nameError').append(nameError)
            document.getElementById('emailError').append(emailError)
            // this.nameError.append(error.response.data.name)
            // console.log('messages', messages);
          } else if (error.response.status == 401) {
            alert('Unauthorized')
            // document.getElementByClassName('error').remove()
            // document.getElementsByClassName('error').html('')
            $('.error').html('')
            document.getElementById('allErrors').append(error.response.data.error)
          }
        }
        console.log(error);
      });
    }
  }
};

</script>

<template>
	<div class="container align-items-center center auth" style="margin-left: 25%;">
		<div class="row justify-content-center">
			<div class="card" style="margin-right: 0%;margin-left: 100%;margin-top: 75%;">
				<h2 class="card-title text-center">
					Profile
				</h2>
	        	<div class="card-body py-md-4">
	        		<div class="success" v-if="savingSuccessful"> 
					    {{ text }} 
					</div>

		      		<form @submit.prevent="fetchData">
		      			<input type="hidden" class="form-control input" id="id" placeholder="id" v-model="id">
	          			<div class="form-group mb-2">
				          	<label>Name : </label>
				            <input type="text" class="form-control input" id="name" placeholder="Name" v-model="name">
			              	<span class="error" id="nameError"></span>
			        	</div>
			        	<div class="form-group mb-2">
				          	<label>Email : </label>
			             	<input type="text" class="form-control input" id="email" placeholder="Email" v-model="email">
			              <span class="error" id="emailError"></span>
			            </div>       
	   					<div class="d-flex flex-row align-items-center justify-content-between">
			      			<a href="#"></a>
		              		<button class="btn btn-primary mt-3" v-on:submit.prevent="fetchData">Update Account</button>
			          	</div>
		      		</form>
	     		</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.center {
	display: flex;
}

.error{
  color: red;
}

.input {
    margin: 10px 0px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
}
input {
    padding: 0px 20px;
    border: 0px;
    border-radius: 5px;
    outline: none;
    height: 50px;
}
</style>
