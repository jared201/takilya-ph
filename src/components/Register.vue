<template>
    <div class="container">                        
        <br>
        <div class="columns">
            <div class="column">

            </div>
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <form id="sign_up" @submit.prevent="processForm">
                        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">    
                        <section>            
                            <ValidationProvider rules="required|email" name="email" v-slot="{ errors}">                
                            <b-field label="Username"  :type="{'is-danger': errors[0],}" :message="errors">
                                <b-input type="email" v-model="email" placeholder="Enter your email"></b-input>
                            </b-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="mobile" v-slot="{ errors}">
                            <b-field label="Mobile Number" :type="{'is-danger': errors[0], 'is-success': valid}" :message="errors">
                                <b-input  value="" placeholder="+639171234567" v-model="mobile"></b-input>
                            </b-field>                                    
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="password" v-slot="{ errors}">
                            <b-field label="Password" :type="{'is-danger': errors[0], 'is-success': valid}" :message="errors">
                                <b-input type="password" value="" v-model="password" placeholder="Enter your password"></b-input>
                            </b-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required|confirmed:password" name="confirm" v-slot="{ errors}">
                            <b-field label="Confirm your Password" :type="{'is-danger': errors[0], 'is-success': valid}" :message="errors">
                                <b-input type="password" v-model="confirm" value="" placeholder="Enter your password"></b-input>
                            </b-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="secret" v-slot="{ errors}">
                            <b-field label="Create your secret key" :type="{'is-danger': errors[0], 'is-success': valid}" :message="errors">
                                <b-input type="password" v-model="secret" value="" placeholder="Any words you can remember"></b-input>
                            </b-field>       
                            </ValidationProvider>                                                         
                            <b-button type="submit" class="is-light is-info" @click="handleSubmit(processForm)">Register</b-button><br>
                            
                        </section>
                        </ValidationObserver>
                        </form>
                    </div>
                </div>
            </div>
            <div class="column">

            </div>
        </div>
        <br>                
    </div>
       
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
    name: 'Register',
    components: {
        ValidationObserver, 
        ValidationProvider
    },
    
    data () {
       return {
        email: '',
        mobile: '',
        password: '',
        secret: '',
        confirm: ''
       };   
        
    }
    ,
    methods : {
        clickMe () {

        },
        processForm () {
            let message = {email: this.email, mobile: this.mobile, password: this.password, secret: this.secret};
            //console.log(message);
            //alert (JSON.stringify(message));
            let url = '/signup'
            fetch(url, {method : 'POST' ,
                headers: {
                "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(message)}).then((response)=>{
                if (response.ok){
                response.text().then((text)=>{
                    console.log (text);     
                    this.$buefy.dialog.alert(text);
               
                });
                } else {
                response.text().then((text)=>{                    
                    console.log (text);
                    this.$buefy.dialog.alert({
                    title: 'Error',
                    message: text,
                    type: 'is-danger',
                    hasIcon: false,
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
                });
                }
            })
                .catch((error)=>{
                    console.log(error);
                });            
        }
    }
}
</script>