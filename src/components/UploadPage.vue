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
                                    <b-input value="" v-model="title" placeholder="Enter the title here"></b-input>
                                </b-field>
                                <b-field horizontal label="Description">
                                    <b-input type="textarea" v-model="description" value="" placeholder="Why do you want to upload this video?"></b-input>
                                </b-field>                                
                                <b-field horizontal label="Secret Key">
                                    <b-input type="password" value="" v-model="secret" placeholder="This enables you to upload videos without having to login"></b-input>
                                </b-field>    
                                <b-field horizontal>
                                    <b-upload  v-model="dropFiles" multiple drag-drop expanded @input="uploadFile">
                                        <section class="section" refs="section">
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
                    dropFiles: [],
                    title: '',
                    description: '',
                    secret: '',
                    objectName: '',
                    dataFile: null,
                }
            },
            methods: {
                deleteDropFile(index) {
                    this.dropFiles.splice(index, 1)
                },
                uploadFile() {
                    
                    this.dataFile = this.dropFiles[0];
                    this.objectName = this.dataFile.name;
                    //let bodyData = {title: this.title, description: this.description, secret: this.secret, objectName: this.objectName, };
                    //var reader = new FileReader();
                    var dialog = this.$buefy.dialog;
                    var formData = new FormData();
                    formData.append('title', this.title);
                    formData.append('description', this.description);
                    formData.append('secret', this.secret);
                    formData.append('dataFile', this.dataFile);
                    
                    let url = '/upload';
                    
                    console.log(this.$refs.section);

                    const loadingComponent = this.$buefy.loading.open({
                      container:  this.$refs.section
                    })
                    fetch(url, {method : 'POST' ,                                                     
                                body: formData}).then((response)=>{
                                    if (response.ok){
                                        response.text().then((text)=>{
                                            console.log (text);     
                                            dialog.alert(text);
                                            loadingComponent.close();
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
                            loadingComponent.close();
                            dialog.alert(error);
                    });                                                                      
                    console.log (this.dataFile);    
                                                            

                }
            }    
}
</script>