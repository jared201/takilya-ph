<template>
    <div class="container">
        
                
        <br>
        <div class="columns">
            <div class="column">

            </div>
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <form>
                        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">    
                        <section>            
                            <ValidationProvider rules="required|email" name="Email" v-slot="{ errors, valid  }">                
                            <b-field label="Username"  :type="{'is-danger': errors[0], 'is-success': valid}" :message="errors">
                                <b-input type="email" v-model="email" placeholder="Enter your email"></b-input>
                            </b-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="Mobile" v-slot="{ errors}">
                            <b-field label="Mobile Number" :type="{'is-danger': errors[0], 'is-success': valid}" :message="errors">
                                <b-input  value="" placeholder="+639171234567" v-model="mobile"></b-input>
                            </b-field>                                    
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="Password" v-slot="{ errors}">
                            <b-field label="Password" :type="{'is-danger': errors[0], 'is-success': valid}" :message="errors">
                                <b-input type="password" value="" v-model="password" placeholder="Enter your password"></b-input>
                            </b-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required|confirmed:Password" name="Confirm" v-slot="{ errors}">
                            <b-field label="Confirm your Password" :type="{'is-danger': errors[0], 'is-success': valid}" :message="errors">
                                <b-input type="password" v-model="confirm" value="" placeholder="Enter your password"></b-input>
                            </b-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="Secret" v-slot="{ errors}">
                            <b-field label="Create your secret key" :type="{'is-danger': errors[0], 'is-success': valid}" :message="errors">
                                <b-input type="password" v-model="secret" value="" placeholder="Any words you can remember"></b-input>
                            </b-field>       
                            </ValidationProvider>                                                         
                            <b-button class="is-light is-info" @click="handleSubmit(clickMe)">Register</b-button><br>
                            
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
    methods : {
        clickMe () {

        }
    }
}
</script>