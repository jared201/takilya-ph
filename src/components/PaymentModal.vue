<template>
    <div class="card">
    <div class="card-content">
        <div class="columns">
            <div class="column">
                <p class="title is-4">
                    1 Kgs of Garden Fresh Okra @ P100.00/kilo 
                </p>
                <p class="title is-4">
                    Shipping
                </p>
                <p class="title is-4">
                    Total
                </p>                
            </div>
            <div class="column">
                <p class="title is-4" align="right">
                    100.00
                </p>
                <p class="title is-4" align="right">
                    50.00
                </p>
                <p class="title is-4" align="right">
                    150.00
                </p>                
            </div>
        </div>
        
      
    </div>
        <footer class="modal-card-foot">
            <b-button
                label="GCash"
                @click="close" />
            <b-button
                label="Paypal"
                type="is-info" 
                @click="clickMe"
                />
        </footer>
    </div>    
</template>
<script>
export default {
    name: 'PaymentModal',
    data() {
        return {
            isPaymentModalActive: false
        }
    }
}
</script>