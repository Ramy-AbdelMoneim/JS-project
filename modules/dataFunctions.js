async function loadData() {
  try {
    const response = await fetch("../JSON/Fields.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
}
export { loadData };
