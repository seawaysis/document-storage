<template>
  <v-container class="fill-height text-center">
    <v-row align="center" 
    justify="center"
    >
      <v-col :cols="6" 
      class="text-center"
      >
        <v-form>
          <v-text-field
            v-model="firstname"
            :counter="10"
            :rules="nameRules"
            label="First name"
            required
          />

          <v-file-input 
            v-model="file"
            label="upload a file"
            accept="file/*"
            @change="handleFileChange"
          />

          <v-btn
            :disabled="!file"
            @click="uploadFile"
          >
            Upload
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import axios from 'axios';

  export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFileChange() {
      console.log('File selected:', this.file);
    },
    async uploadFile() {
      if (this.file) {
        const formData = new FormData();
        formData.append('file', this.file);

        try {
          const response = await axios.post('http://localhost:3000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          console.error('File upload error:', error);
        }
      }
    },
  },
};
</script>