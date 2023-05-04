<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      passResetRequest: {
        email: '',
        password: '',
      }
    }
  },
  name: 'Register',
  props: {
    msg: String
  },
  methods: {
    fetchData(event) {
      // alert('f')
      const formData = new FormData()
      let email = this.email ? this.email : ''
      let password = this.password ? this.password : ''
      formData.append('email', email)
      formData.append('password', password)
      // axios.get('http://127.0.0.1:8000/api/get_all_user', {
      axios.post('http://127.0.0.1:8000/api/auth/login', formData, {
        // method: 'GET',
        method: 'POST',
        mode: 'no-cors',
        // headers: {
        //   'Access-Control-Allow-Origin':'*',
          //   'x-rapidapi-host': 'random-facts2.p.rapidapi.com',
          //   'x-rapidapi-key': 'Your -RapidAPI-Hub-Key'
        // }
      })
      .then(response => {
        console.log('response', response)
        // localStorage.name = 
        sessionStorage.jwtToken = response.data.access_token
        localStorage.jwtToken = response.data.access_token
        sessionStorage.name = response.data.user.name
        sessionStorage.email = response.data.user.email
        sessionStorage.id = response.data.user.id
        window.location = '/'
        // this.$router.push("/");
        // response.json().then(res => console.log(res));
      })
      .catch(error => {
        console.log('erc', error.code);
        console.log('error response', error.response);
            $('#password').val('');
        if (error.response != undefined) {
          if (error.response.status == 422) {
            // alert('t')
            console.log('error response name', error.response.data);
            // let messages = JSON.parse(error.response.data)
            // errors = JSON.parse(error.response.data)
            // document.getElementById('password').text('');
            // alert()
            let emailError = error.response.data.email ? error.response.data.email : ''
            let passwordError = error.response.data.password ? error.response.data.password : ''
            $('.error').html('')
            document.getElementById('emailError').append(emailError)
            document.getElementById('passwordError').append(passwordError)
            // this.nameError.append(error.response.data.name)
            // console.log('messages', messages);
          } else if (error.response.status == 401) {
            // alert('Unauthorized')
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
              // <a href="#">Create Account</a>

</script>

<template>
	<div class="container align-items-center center" style="margin-left: 25%;">
		<div class="row justify-content-center">
			<div class="card" style="margin-right: 0%;margin-left: 100%;margin-top: 75%;">
				<h2 class="card-title text-center">
					Login
				</h2>
        <span class="error text-center" id="allErrors"></span>
		    <div class="card-body py-md-4">
			    <form v-on:submit.prevent="fetchData">
	          <div class="form-group mb-2">
	          	<label>Email : </label>
             	<input type="text" class="form-control" id="email" placeholder="Email" v-model="email">
              <span class="error" id="emailError"></span>
            </div>        
	   			  <div class="form-group mb-2">
		          <label>Password : </label>
	     			  <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
              <span class="error" id="passwordError"></span>
	   			  </div>
	   			  <div class="d-flex flex-row align-items-center justify-content-between">
              <router-link to="/register">Create Account</router-link>
	      			<button class="btn btn-primary mt-3">Login</button>
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
</style>
