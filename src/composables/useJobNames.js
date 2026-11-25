import { onMounted, ref } from "vue";
import { getAllJobs } from "@/services/job-service";

// Danh sách tên vị trí (Job) để gợi ý trong các form
export function useJobNames() {
  const jobs = ref([]);
  onMounted(async () => {
    try {
      const res = await getAllJobs();
      jobs.value = ((res && res.data) || []).map((j) => j.jobName).filter(Boolean);
    } catch {
      jobs.value = [];
    }
  });
  return jobs;
}
