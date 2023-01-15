<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>WebSocket API</div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
    const ws = new WebSocket("ws://10.4.0.31:8000");
    // const ws = new WebSocket("ws://192.168.57.234:8000");
    ws.onopen = function (/* event */) {
      ws.send("Hello, server!");
    };
    ws.onmessage = function (event) {
      console.log(event.data);
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
