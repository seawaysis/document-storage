<template>
  <v-dialog
    v-if="dialogCompose === true"
    v-model="localDialogCompose"
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
</template>

<script lang="ts">
  export default{
    props: {
      dialogCompose: Boolean
    },
    data() {
      return {
        // Create a local copy of the prop for internal mutation
        localDialogCompose: this.dialogCompose
      };
  },
  }
</script>