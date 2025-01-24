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
                    @click="editDoc">Edit</v-btn>
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
        :cols="5" 
        class="text-center">
        <v-form>
          <v-text-field
            v-model="name"
            :counter="20"
            label="Name"
            required
          />
          <!-- <span>{{ name }}</span> -->
          <v-file-input
            v-model="file"
            label="upload a file"
            accept="file/*"
            @change="handleFileChange"
          />

          <v-btn 
            :disabled="!file" 
            @click="uploadFile">Upload</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import axios from 'axios';
import { onMounted,ref } from 'vue';

interface Doc {
  id: number;
  firstName: string;
  fileName: string;
  createdAt: string;
  file?: File;
}

export default {
  setup() {
    const api_backend = import.meta.env.VITE_API_BACKEND;
    const name = ref<string>('');
    const file = ref<File | null>(null);

    const editName = ref<string>('');
    const editFile = ref<File | null>(null);

    const listDoc = ref<Doc[]>();

    const handleFileChange = () => {
      console.log('File selected:', file.value);
    };
    const editDoc = () => {
      
    }
    const delDoc = async (id : number) => {
      await axios.delete(api_backend+'personal/'+id).then(res => res.data); // replace with your API URL
      loadData();
    }
    const uploadFile = async () => {
      console.log('name : ', name.value);
      if (file.value) {
        const formData = new FormData();
        formData.append('file', file.value);
        formData.append('firstName', name.value);

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
          name.value = '';
          file.value = null;
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
      name,
      file,
      editName,
      editFile,
      listDoc,
      editDoc,
      delDoc,
      handleFileChange,
      uploadFile,
      editUploadFile,
    };
  },
};
</script>