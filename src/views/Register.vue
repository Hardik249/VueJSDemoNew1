<script>
import axios from 'axios'
// formData.append('avatar', this.FILE, this.FILE.name)

export default {
  data: function () {
    return {
      passResetRequest: {
        // name: '',
        // email: '',
        password: '',
        password_confirmation: '',
      },
      password: '',
      password_confirmation: '',
      errors:[],
    }
  },
  name: 'Register',
  props: {
    msg: String
  },
  methods: {
    fetchData(event) {
      console.log('name', this.name)
      console.log('email', this.email)
      console.log('password', this.password)
      console.log('password_confirmation', this.password_confirmation)
      const formData = new FormData()
      let name = this.name ? this.name : ''
      let email = this.email ? this.email : ''
      let password = this.password ? this.password : ''
      let password_confirmation = this.password_confirmation ? this.password_confirmation : ''
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('password_confirmation', password_confirmation)
      let errors;
      // axios.get('http://127.0.0.1:8000/api/get_all_user', {
      axios.post('http://127.0.0.1:8000/api/auth/register', formData, {
        // method: 'GET',
        method: 'POST',
        mode: 'no-cors',
        // headers: {
        //   'Access-Control-Allow-Origin':'*',
          // 'Allow-Origin':'*',
          //   'x-rapidapi-host': 'random-facts2.p.rapidapi.com',
          //   'x-rapidapi-key': 'Your -RapidAPI-Hub-Key'
        // }
      })
      .then(response => {
        console.log('response', response);
        // sessionStorage.name = response.data.user.name
        window.location = '#/login'
        response.json().then(res => console.log(res));
        // if (err.code == 'ERR_BAD_REQUEST') {
        //   alert('t')
        //   this.nameError = response.name
        // }
        // console.log('ers', err.status);
        // console.log('erc', err.code);
        // console.log('err', err);
        // console.log('ercnf', err.config);
        alert('er', err);
      })
      .catch(error => {
        if (error.code == 'ERR_BAD_REQUEST') {
          // alert('t')
          let messages = JSON.parse(error.response.data)
          // errors = JSON.parse(error.response.data)
          // console.log('dc', document.getElementsByClassName('error'))
          // document.getElementsByClassName('error').empty()
          // document.getElementsByClassName('error').html(null)
          // document.getElementsByClassName('error').html('')
          let nameError = messages.name ? messages.name : ''
          let emailError = messages.email ? messages.email : ''
          let passwordError = messages.password ? messages.password[0] : ''
          // let confirmPassErr = messages.password ? messages.password[1] : '';
          let confirmPassErr;
          if (messages.password != undefined) {
            confirmPassErr = messages.password[1];
          }
          confirmPassErr = '';
          let passError = passwordError.toString()
          // let passErr = passError.split(",")
          // alert(typeof(passError))
          // alert(typeof(passwordError))
          // alert(typeof(messages.password))
          // alert(passErr)
          // passwordError.forEach(function(key, value) {
          //   console.log(`key ${key} value ${value}`)
          //   let passEr = key
          //   let pasErr = key
          // })
          console.log('p', passwordError)
          console.log('p0', passwordError[0])
          console.log('p1', passwordError[1])
          // alert(passwordError)
          $('#password').val('');
          $('#password_confirmation').val('');
          $('.error').html('')
          document.getElementById('nameError').append(nameError)
          document.getElementById('emailError').append(emailError)
          document.getElementById('passwordError').append(passwordError)
          document.getElementById('password_confirmationError').append(confirmPassErr)
          // document.getElementById('password_confirmationError').append(messages.password)
          // this.nameError.append(error.response.data.name)
          // console.log('messages', messages);
        }
        // console.log('error response', error.response);
        // console.log('error response name', error.response.data);
        // // console.log('messages errors', errors);
        // console.log('ers', error.status);
        // console.log('erc', error.code);
        // console.log('error', error);
      });
    }
  }
};
//              <a href="#">Login</a>

</script>

<template>
	<div style="margin-left: 35%;margin-right: 35%;margin-top: 10%;">
		<div class="row">
			<div class="card">
				<h2 class="card-title text-center">
					Register
				</h2>
	      <div class="card-body py-md-4">
		      <form v-on:submit.prevent="fetchData">
	          <div class="form-group mb-2">
	          	<label>Name : </label>
	            <input type="text" class="form-control" id="name" placeholder="Name" v-model="name">
              <span class="error" id="nameError"></span>
	        	</div>
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
            <div class="form-group mb-2">
              <label>Confirm Password : </label>
              <input type="password" class="form-control" id="password_confirmation" placeholder="Confirm Password" v-model="password_confirmation">
              <span class="error" id="password_confirmationError"></span>
            </div>
	   			  <div class="d-flex flex-row align-items-center justify-content-between">
              <router-link to="/login">Login</router-link>
              <button class="btn btn-primary mt-3">Create Account</button>
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
	justify-content: center;
	margin-left: 0;
  margin-bottom: 10%;
  margin-top: 8%;
}

.error{
  color: red;
}
</style>
