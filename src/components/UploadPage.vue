<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <br>
                <div class="card">
                    <div class="card-content">
                        <form>
                            <section>
                                <b-field horizontal label="Title">
                                    <b-input value="" placeholder="Enter the title here"></b-input>
                                </b-field>
                                <b-field horizontal label="Description">
                                    <b-input type="textarea" value="" placeholder="Why do you want to upload this video?"></b-input>
                                </b-field>                                
                                <b-field horizontal label="Secret Key">
                                    <b-input type="password" value="" placeholder="This enables you to upload videos without having to login"></b-input>
                                </b-field>    
                                <b-field horizontal>
                                    <b-upload v-model="dropFiles" multiple drag-drop expanded>
                                        <section class="section">
                                        <div class="content has-text-centered">
                                            <p>
                                            
                                            <font-awesome-icon icon="cloud-upload-alt" size="8x"></font-awesome-icon>
                                            </p>
                                            <p>Drop your files here or click to upload</p>
                                        </div>
                                        </section>
                                    </b-upload>
                                </b-field>         
                                <b-field horizontal>
                                <div class="tags">
                                    <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
                                        {{file.name}}
                                        <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
                                    </span>
                                </div>                                                                                                                   
                                </b-field>

                            </section>
                        </form>
                    </div>
                </div>
                <br>
            </div>
        </div>
    </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret , faAngleDoubleRight , faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faAngleDoubleRight, faCloudUploadAlt)

export default {
    components: {
        FontAwesomeIcon
    },
    data() {
                return {
                    dropFiles: []
                }
            },
            methods: {
                deleteDropFile(index) {
                    this.dropFiles.splice(index, 1)
                }
            }    
}
</script>