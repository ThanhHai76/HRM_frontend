<template>
  <div class="page-wrapper calendar_page">
    <div class="content container-fluid">
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12 mb-4">
          <div class="breadcrumb-path">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html"
                  ><img
                    src="@/assets/img/dash.png"
                    class="mr-2"
                    alt="breadcrumb"
                  />Home</a
                >
              </li>
              <li class="breadcrumb-item active">Calendar</li>
            </ul>
            <h3>Calendar</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12 mb-4">
          <VCalendar
            ref="calendar"
            :initial-page="{ month: 2, year: 2024 }"
            :color="selectedColor"
            :attributes="attrs"
          >
            <template #footer>
              <div class="w-full px-3 pb-3">
                <button
                  class="bg-pink hover:bg-pink font-bold w-full px-3 py-1 rounded-md"
                  @click="moveToday"
                >
                  Today
                </button>
              </div>
            </template>
          </VCalendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "CalendarPage",
  setup() {
    const calendar = ref(null);
    const moveToday = function () {
      calendar.value.move(new Date());
    };
    const selectedColor = ref("pink");
    const attrs = ref([
      {
        key: "test",
        highlight: true,
        dates: new Date(),
      },
    ]);

    return {
      selectedColor,
      attrs,
      calendar,
      moveToday,
    };
  },
};
</script>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}
.bg-pink {
  background-color: pink;
  border: none;

  &:hover {
    opacity: 0.8;
  }
}
</style>
