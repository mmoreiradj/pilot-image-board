import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export interface Alert {
  id?: number;
  type: string;
  description: string;
  timeout: number;
}

export const useAlertsStore = defineStore("alerts", () => {
  const alerts: Ref<Alert[]> = ref([]);
  let count = 0;

  function addAlert(alert: Alert) {
    alert.id = count++;
    alerts.value.push(alert);
    setTimeout(() => {
      removeAlert(alert);
    }, alert.timeout);
  }

  function removeAlert(alert: Alert) {
    alerts.value = alerts.value.filter((element) => element.id !== alert.id);
  }

  return { alerts, addAlert, removeAlert };
});
