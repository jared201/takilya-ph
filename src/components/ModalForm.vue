<template>
        <form action="">
                <div class="modal-card" >
                    <header class="modal-card-head">
                        <p class="modal-card-title">Order Form</p>
                        <button
                            type="button"
                            class="delete"
                            @click="close"/>
                    </header>
                    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                    <section class="modal-card-body">
                       <ValidationProvider rules="required" name="Name" v-slot="{ errors  }">
                        <b-field label="Name" label-position="on-border"
                               :type="{'is-danger': errors[0]}"
                               :message="errors"> 
                            <b-input 
                                type="text"
                                ref="name"                            
                                placeholder="Your Name"                                 
                                v-model="name"
                                >
                            </b-input>
                        </b-field>
                       </ValidationProvider> 
                       <ValidationProvider rules="required|email" name="Email" v-slot="{errors, valid}">
                        <b-field label="Email" label-position="on-border"
                            :type="{'is-danger': errors[0], 'is-success': valid}"
                            :message="errors"
                            >
                            <b-input
                                type="email"                                
                                placeholder="Your email"
                                v-model="email"
                                >
                            </b-input>
                        </b-field>
                        </ValidationProvider>
                        <ValidationProvider rules="required" name="Mobile" v-slot="{ errors  }">
                        <b-field label="Mobile Number" label-position="on-border"
                            :type="{'is-danger': errors[0], 'is-success': valid}"
                            :message="errors"
                            >
                            <b-input                                                                
                                placeholder="+639171234567"
                                v-model="mobile"
                                >
                                
                            </b-input>
                        </b-field>                        
                        </ValidationProvider>
                        <ValidationProvider rules="required|positive" name="Weight" v-slot="{ errors  }">
                        <b-field 
                            label="Weight"
                            label-position="on-border"
                            :type="{'is-danger': errors[0], 'is-success': valid}"
                            :message="errors"
                            >
                            <b-input placeholder="Enter amount in kilos"
                                type="number"
                                min="1"
                                max="1000"
                                v-model="weight">
                            </b-input>
                        </b-field>
                        </ValidationProvider>
                        <ValidationProvider rules="required" name="Address" v-slot="{errors, valid}">
                        <b-field label="Shipping Address" label-position="on-border"
                            :type="{'is-danger': errors[0], 'is-success': valid}"
                            :message="errors"
                            >
                            <b-input
                                type="textarea"                                
                                placeholder="Enter your Complete Shipping Address"
                                v-model="address"
                                >
                            </b-input>
                        </b-field>
                        </ValidationProvider>
                        
                    </section>
                    
                    <footer class="modal-card-foot">
                        <b-button
                            label="Close"
                            @click="close" />
                        <b-button
                            label="Click for Total Pricing and Payment"
                            type="is-info" 
                            @click="handleSubmit(clickMe)"
                            />
                    </footer>
                    <div ref="key">{{key}}</div>
                    </ValidationObserver>
                </div>
            </form>
              
</template>
<script>
import PaymentModal from './PaymentModal.vue';
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
    
    name: 'ModalForm',
    components: {
        ValidationObserver,
        ValidationProvider
    },    
    methods: {
        clickMe() {
            
            //TODO use VeeValidate to validate input entries
            this.$buefy.modal.open({
                parent: this,
                component: PaymentModal,
                width: '640px',
                scroll: 'keep',
                trapFocus: true
            })           
            this.$parent.close();
            
            //console.log('key: ' + this.$refs.key.innerHTML);
        },
        close() {
            this.$parent.close()
        }
    },
    
    data () {
        return {
            isComponentModalActive: false,
            name: '',
            key: 'CHO0603'
        }
    }

}
</script>