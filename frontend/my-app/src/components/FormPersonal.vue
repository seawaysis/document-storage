<template>
  <v-container class="fill-height text-center">
    <v-row 
      justify="center" style="width : 100%">
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>File Name</th>
              <th>createdAt</th>
              <th>manage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v,i) in listDoc" 
            :key="i">
              <td>{{ v.firstName }}</td>
              <td>{{ v.fileName }}</td>
              <td>{{ v.createdAt }}</td>
              <td>
                <v-form>
                  <v-btn 
                    name="edit"
                    size="small"
                    color="yellow"
                    @click="editDoc(v.id)">Edit</v-btn>
                  <v-btn 
                    name="del"
                    size="small"
                    color="red"
                    @click="delDoc(v.id)">Delete</v-btn>
                </v-form>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col 
        :cols="8" 
        class="text-center">
        <v-form>
          <v-row>
            <v-col
              :cols="6"
            >
              <v-text-field
                v-model="dataUpload.firstName"
                :counter="20"
                label="First name"
                required
              />
            </v-col>
            <v-col
              :cols="6"
            >
              <v-text-field
                v-model="dataUpload.lastName"
                :counter="20"
                label="Last name"
                required
              />
            </v-col>
          </v-row>
          <v-radio-group 
            v-model="dataUpload.gender"
            inline
            required
          >
            <v-radio label="Male" value="male"></v-radio>
            <v-radio label="Female" value="female"></v-radio>
          </v-radio-group>
          <v-text-field
          v-model="dataUpload.email"
            label="Email address"
            placeholder="johndoe@gmail.com"
            type="email"
            required
          />
          <v-textarea
            v-model="dataUpload.description"
            label="description"
          />
          <v-date-input 
            clearable 
            label="Date input"
            v-model="dataUpload.birthDate"
            required
          />
          <v-file-input
            v-model="dataUpload.file"
            label="upload a file"
            accept="file/*"
            @change="handleFileChange"
          />

          <v-btn 
            :disabled="!dataUpload.file" 
            @click="uploadFile">Upload</v-btn>
        </v-form>
      </v-col>
    </v-row>

    <v-dialog
      v-if="dialogCompose === true"
      v-model="dialogCompose"
      width="700">
      <v-card>
        <v-card-title 
          class="headline black" 
          primary-title>
          Edit
        </v-card-title>
        <v-card-text class="pa-5">
          qwdqwdsa
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import axios from 'axios';
import { onMounted,ref } from 'vue';
//import dialogEdit from './components/dialogEdit.vue';

interface Doc {
  id: number;
  firstName: string;
  fileName: string;
  createdAt: string;
  file?: File;
}

interface DataUpload {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  birthDate: Date;
  description: string;
  file: File | null;
}
export default {
  setup() {
    const api_backend = import.meta.env.VITE_API_BACKEND;
    const dialogCompose = ref<boolean>(false);
    // const name = ref<string>('');
    // const file = ref<File | null>(null);
    const dataUpload = ref<DataUpload>({
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      description: '',
      birthDate: new Date(),
      file: null,
    });

    const editName = ref<string>('');
    const editFile = ref<File | null>(null);

    const listDoc = ref<Doc[]>();

    const handleFileChange = () => {
      //console.log('File selected:', dataUpload.file.value);
    };
    const editDoc = (id:number) => {
      dialogCompose.value = true;
      console.log(id);
      // let getDoc = listDoc.value?.map((v)=> {
        
      // });
    }
    const delDoc = async (id : number) => {
      await axios.delete(api_backend+'personal/'+id).then(res => res.data); // replace with your API URL
      loadData();
    }
    const uploadFile = async () => {
      if (dataUpload.value.file) {
        const formData = new FormData();
        formData.append('file', dataUpload.value.file);
        formData.append('firstName', dataUpload.value.firstName);
        formData.append('lastName', dataUpload.value.lastName);
        formData.append('gender', dataUpload.value.gender);
        formData.append('email', dataUpload.value.email);
        formData.append('description', dataUpload.value.description);
        formData.append('birthDate', dataUpload.value.birthDate.toString());

        try {
          const response = await axios.post(
            api_backend+'personal',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          dataUpload.value = {
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            description: '',
            birthDate: new Date(),
            file: null,
          }
          loadData();
          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          console.error('File upload error:', error);
        }
      }
    };

    const editUploadFile = async (id : number) => {
      if (editFile.value) {
        const formData = new FormData();
        //formData.append('file', editFile.value);
        formData.append('firstName', editName.value); //editName.value

        try {
          const response = await axios.patch(
            api_backend+'personal/'+id,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          loadData();
          console.log('Update successfully:', response.data);
        } catch (error) {
          console.error('Update error:', error);
        }
      }
    };

    const loadData = async () => {
      listDoc.value = await axios.get(api_backend+'personal').then(res => res.data.reverse()); // replace with your API URL
    }
    onMounted(() => {
      loadData();
    });
    return {
      dataUpload,
      editName,
      editFile,
      listDoc,
      editDoc,
      delDoc,
      dialogCompose,
      handleFileChange,
      uploadFile,
      editUploadFile,
    };
  },
};
</script>