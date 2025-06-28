<template>
  <div class="table-responsive">
    <table class="table table-bordered align-middle" :class="customClass">
      <thead class="table-light">
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="(header, colIndex) in headers" :key="colIndex">
            <slot :name="`cell-${header}`" :row="row" :value="row[header]" :rowIndex="rowIndex" :colIndex="colIndex">
              {{ row[header] }}
            </slot>
          </td>
        </tr>
        <tr v-if="!rows || rows.length === 0">
          <td :colspan="headers.length" class="text-center text-muted">No data available</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  headers: { type: Array, required: true },
  rows: { type: Array, required: true },
  customClass: { type: String, default: '' }
})
</script>