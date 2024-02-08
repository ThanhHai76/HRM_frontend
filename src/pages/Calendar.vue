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
            :initial-page="{ month: 2, year: 2024 }"
            :color="selectedColor"
            :attributes="attrs"
          />

          <!-- <ejs-schedule :selectedDate='selectedDate' :eventSettings='eventSettings'></ejs-schedule> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';
export default {
  name: "CalendarPage",
  data() {
            return {
                eventSettings: { dataSource: [{
                    Id: 1,
                    Subject: 'Meeting',
                    StartTime: new Date(2023, 1, 15, 10, 0),
                    EndTime: new Date(2023, 1, 15, 12, 30)
                    }] },
                selectedDate: new Date(2023, 1, 15)
            }
        },
        provide: {
            schedule: [Day, Week, WorkWeek, Month, Agenda]
        },
  setup() {
    const selectedColor = ref("pink");
    const attrs = ref([
      {
        key: "test",
        highlight: true,
        dates: { start: new Date(2024, 1, 8), end: new Date(2024, 1, 14) },
      },
    ]);

    return {
      selectedColor,
      attrs,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@syncfusion/ej2-base/styles/material.css';
@import '@syncfusion/ej2-buttons/styles/material.css';
@import '@syncfusion/ej2-calendars/styles/material.css';
@import '@syncfusion/ej2-dropdowns/styles/material.css';
@import '@syncfusion/ej2-inputs/styles/material.css';
@import '@syncfusion/ej2-navigations/styles/material.css';
@import '@syncfusion/ej2-popups/styles/material.css';
@import '@syncfusion/ej2-vue-schedule/styles/material.css';
</style>
