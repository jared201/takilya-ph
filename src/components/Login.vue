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
                        <section>                            
                            <b-field horizontal label="Username" >
                                <b-input value="" placeholder="Enter your email"></b-input>
                            </b-field>
                            <b-field horizontal label="Password" >
                                <b-input type="password" value="" placeholder="Enter your password"></b-input>
                            </b-field>
                            <b-button class="is-light is-info">Login</b-button><br>
                            <router-link to="/">Forgot Password?</router-link>                         
                        </section>
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
export default {
    
}
</script>