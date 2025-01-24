<template>
  <v-container class="fill-height text-center">
    <v-row justify="center" style="overflow: auto;">
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th>firstName</th>
              <th>fileName</th>
              <th>createdAt</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v,i) in listDoc" :key="i">
              <td>{{ v.firstName }}</td>
              <td>{{ v.fileName }}</td>
              <td>{{ v.createdAt }}</td>
              <td>
                <v-btn name="edit" type="btn">Edit</v-btn>
                <v-btn name="del" type="btn">Delete</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col :cols="12" class="text-center">
        <v-form>
          <v-text-field
            v-model="name"
            :counter="20"
            label="Name"
            required
            @change="changeName"
          />
          <span>{{ name }}</span>
          <v-file-input
            v-model="file"
            label="upload a file"
            accept="file/*"
            @change="handleFileChange"
          />

          <v-btn :disabled="!file" @click="uploadFile"> Upload </v-btn>
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
}

export default {
  // mounted(){
  //   const list = axios.get('http://localhost:8080/personal').then(res => res.data);
  //   console.log(list);
  // }
  setup() {

    const name = ref<string>('');
    const file = ref<File | null>(null);
    const listDoc = ref<Doc[]>();
    //const getName = ref<string>('');

    const handleFileChange = () => {
      console.log('File selected:', file.value);
    };

    const changeName = () => {
      //getName.value = name.value;
    };

    const uploadFile = async () => {
      console.log('name : ', name.value);
      if (file.value) {
        const formData = new FormData();
        formData.append('file', file.value);
        formData.append('firstName', name.value);

        try {
          const response = await axios.post(
            'http://localhost:8080/personal',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          console.error('File upload error:', error);
        }
      }
    };

    const loadData = async () => {
      listDoc.value = await axios.get('http://localhost:8080/personal').then(res => res.data); // replace with your API URL
    }
    onMounted(() => {
      loadData();
    });
    return {
      name,
      file,
      listDoc,
      handleFileChange,
      changeName,
      uploadFile,
    };
  },
};
</script>