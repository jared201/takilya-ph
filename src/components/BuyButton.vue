<template>
    <div class="container">
        <div class="columns">
            <div class="column">
        <section>
            <b-button
                label="BUY OKRA NOW"
                type="is-info"
                size="is-large"
                @click="isComponentModalActive = true" />
            
            <b-modal
                v-model="isComponentModalActive" 
                has-modal-card
                trap-focus                
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-label="Example Modal"
                aria-modal >
                <modal-form />
            </b-modal>
            
        </section>              
            </div>
        </div>

    </div>
</template>
<script>
    import ModalForm from './ModalForm.vue'
    
    export default {
        name: 'BuyButton',
        components: {
            ModalForm,
            
        },
        data() {
            return {
                isPaymentModalActive: false,
                isComponentModalActive: false,
                formProps: {
                    email: 'evan@you.com',
                    password: 'testing',
                    name: '',
                    mobile: ''
                }
            }
        },
        methods: {
            clickMe() {
                this.$buefy.notification.open('Clicked!!')
            }
        }
    }

</script>