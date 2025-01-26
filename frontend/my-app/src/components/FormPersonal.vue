<template>
  <v-container class="fill-height text-center">
    <v-row 
      justify="center" style="width : 100%">
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>createdAt</th>
              <th>manage</th>
            </tr>
          </thead>
          <tbody 
            v-for="(v,i) in listDoc" 
            :key="i">
            <tr>
              <td>{{ v.fileName }}</td>
              <td>{{ v.createdAt }}</td>
              <td>
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
              </td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: left; padding:10px 0 10px 20px; border-collapse: collapse; border-bottom: 2px solid gray">
                <span><b>First name : </b>{{ v.firstName }}</span>&nbsp;&nbsp;
                <span><b>Last name : </b>{{ v.lastName }}</span><br>
                <span><b>Birth date: </b>{{ v.birthDate }}</span>&nbsp;&nbsp;
                <span><b>Gender : </b>{{ v.gender }}</span><br>
                <span><b>Email : </b>{{ v.email }}</span><br>
                <span><b>Description : </b>{{ v.description }}</span><br>
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
          />

          <v-btn 
            :disabled="!dataUpload.file" 
            @click="uploadFile">Upload</v-btn>
        </v-form>
      </v-col>
    </v-row>

    <dialogEdit 
      :dialogCompose="dialogCompose"
    />
    <v-row justify="center">
      <v-col 
        :cols="8" 
        class="text-center">
        <h1>update</h1>
        <v-form>
          <v-row>
            <v-col
              :cols="6"
            >
              <v-text-field
                v-model="dataUpdate.firstName"
                :counter="20"
                label="First name"
                required
              />
            </v-col>
            <v-col
              :cols="6"
            >
              <v-text-field
                v-model="dataUpdate.lastName"
                :counter="20"
                label="Last name"
                required
              />
            </v-col>
          </v-row>
          <v-radio-group 
            v-model="dataUpdate.gender"
            inline
            required
          >
            <v-radio label="Male" value="male"></v-radio>
            <v-radio label="Female" value="female"></v-radio>
          </v-radio-group>
          <v-text-field
          v-model="dataUpdate.email"
            label="Email address"
            placeholder="johndoe@gmail.com"
            type="email"
            required
          />
          <v-textarea
            v-model="dataUpdate.description"
            label="description"
          />
          <v-date-input 
            clearable 
            label="Date input"
            v-model="dataUpdate.birthDate"
            required
          />
          <v-file-input
            v-model="dataUpdate.file"
            label="upload a file"
            accept="file/*"
          />

          <v-btn 
            @click="editUploadFile">Update</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import axios from 'axios';
import { onMounted,ref } from 'vue';
import dialogEdit from './dialogEdit.vue';

interface Doc {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  birthDate: Date;
  description: string;
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
interface DataUpdate {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  birthDate: Date;
  description: string;
  file?: File | null;
}
export default {
  components: {
    dialogEdit
  },
  setup() {
    const api_backend = import.meta.env.VITE_API_BACKEND;
    const dialogCompose = ref<boolean>(false);
    const dataUpload = ref<DataUpload>({
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      description: '',
      birthDate: new Date(),
      file: null,
    });
    const dataUpdate = ref<DataUpdate>({
      id: 0,
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
    
    const editDoc = (id:number) => {
      dialogCompose.value = true;
      const getData = listDoc.value?.find(item=>item.id === id);
      if(getData){
        dataUpdate.value = {
          id : getData?.id,
          firstName : getData?.firstName,
          lastName : getData?.lastName,
          gender : getData?.gender,
          email : getData?.email,
          description : getData?.description,
          birthDate : new Date(getData?.birthDate),
          file: getData.file ?? null,
        }
      }
      console.log(dataUpdate);
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
        formData.append('birthDate', dataUpload.value.birthDate.toLocaleDateString('en-US').toString());

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

    const editUploadFile = async () => {
        const formData = new FormData();
        if (dataUpdate.value.file) {formData.append('file', dataUpdate.value.file);}
        formData.append('firstName', dataUpdate.value.firstName);
        formData.append('lastName', dataUpdate.value.lastName);
        formData.append('gender', dataUpdate.value.gender);
        formData.append('email', dataUpdate.value.email);
        formData.append('description', dataUpdate.value.description);
        formData.append('birthDate', dataUpdate.value.birthDate.toLocaleDateString('en-EN').toString());

        try {
          const response = await axios.put(
            api_backend+'personal/'+dataUpdate.value.id,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          dataUpdate.value = {
            id: 0,
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            description: '',
            birthDate: new Date(),
            file: null,
          }
          loadData();
          console.log('Update successfully:', response.data);
        } catch (error) {
          console.error('Update error:', error);
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
      dataUpdate,
      editName,
      editFile,
      listDoc,
      editDoc,
      delDoc,
      dialogCompose,
      uploadFile,
      editUploadFile,
    };
  },
};
</script>