<template>
  <div>
    <div class="chips">
      <span v-for="(item, i) in modelValue" :key="item + i" class="ui-chip">
        {{ item }}
        <button type="button" :disabled="readonly" @click="remove(i)">&times;</button>
      </span>
    </div>
    <input
      v-if="!readonly"
      class="form-control"
      type="text"
      :placeholder="placeholder"
      v-model="draft"
      @keydown.enter.prevent="add"
      @keydown="onKey"
      @blur="add"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  placeholder: { type: String, default: "Nhập rồi nhấn Enter" },
  readonly: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const draft = ref("");

function add() {
  const value = draft.value.trim();
  draft.value = "";
  if (!value || props.modelValue.some((v) => v.toLowerCase() === value.toLowerCase())) return;
  emit("update:modelValue", [...props.modelValue, value]);
}
function remove(index) {
  emit("update:modelValue", props.modelValue.filter((_, i) => i !== index));
}
function onKey(e) {
  if (e.key === ",") {
    e.preventDefault();
    add();
  }
}
</script>

<style scoped>
.chips { margin-bottom: 6px; min-height: 4px; }
</style>
