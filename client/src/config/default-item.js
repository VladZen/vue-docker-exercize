export default (item = null) => ({
  id: null,
  name: "",
  quantity: 0,
  ...(typeof item === "object" && item !== null ? item : {}),
});
