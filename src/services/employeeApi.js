// services/employeeApi.js
import { BASE } from "../global/constants";

export async function fetchEmployeeProjects() {
  const res = await fetch(`${BASE}/api/employees`, {
    headers: { "Content-Type": "application/json" },
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data; // array of { employeeName, employeeGuid, projectName, projectGuid, employeeEmail }
}
