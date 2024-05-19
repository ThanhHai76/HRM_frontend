<template>
  <div>
    <vue-editor v-model="content" @keyup.enter="showText"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-quill-editor'

String.prototype.toHtmlEntities = function() {
    return this.replace(/./gm, function(s) {
        // return "&#" + s.charCodeAt(0) + ";";
        return (s.match(/[a-z0-9\s]+/i)) ? s : "&#" + s.charCodeAt(0) + ";";
    });
};
export default {
  data () {
    return {
      content: '<h1>Some initial content</h1>'
    }
  },

  methods: {
    showText () {
      console.log(this.content)
    },
    stringToHTML () {
      let parser = new DOMParser();
      let doc = parser.parseFromString(this.content, 'text/html');
      console.log(doc.div)
    },
    htmlDecode(input) {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    },
    htmlEntities(str) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
  },
  
  components: {
    VueEditor
  }
}
</script>

<style scoped>
::v-deep(.ql-container .ql-editor p) {
  color: black !important;
}
</style>