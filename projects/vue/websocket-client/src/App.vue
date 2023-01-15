<template>
  <div>Arduino RP2040 WebSocket</div>
  <img alt="Vue logo" src="./assets/logo.png" />
  <fieldset>
    <legend>WebSocket</legend>
    <label for="host">Host</label>
    <input @change="onChangeWS" id="host" type="text" v-model="websocket.host" />
    <label for="host">Port</label>
    <input @change="onChangeWS" id="host" type="text" v-model="websocket.port" />
    <button @click="onClickConnect">Connect</button>
  </fieldset>
  <fieldset>
    <legend>NeoPixel RGB</legend>
    <div v-for="color in neopixel" :key="color.name">
      <label :for="color.name">{{ color.name }}:</label>
      <input
        class="slider"
        type="range"
        v-model="color.value"
        min="0"
        max="255"
        :id="color.name"
        role="slider"
        :aria-valuemin="0"
        :aria-valuemax="255"
        :aria-valuenow="color.value"
        :aria-labelledby="color.name"
        @change="onChangeNeoPixel"
      />
    </div>
  </fieldset>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      websocket: {
        handle: null,
        opened: false,
        host: "10.4.0.31",
        port: 8000,
      },
      neopixel: [
        { name: "Red", value: 128 },
        { name: "Green", value: 128 },
        { name: "Blue", value: 128 },
      ],
      ws: null,
      wsOpen: false,
    };
  },
  methods: {
    onClickConnect() {
      const { websocket } = this;
      websocket.handle = new WebSocket(`ws://${websocket.host}:${websocket.port}`);
      websocket.handle.onopen = function () {
        websocket.opened = true;
        websocket.handle.send("Hello, server!");
      };
      websocket.handle.onmessage = function (event) {
        console.log("WebSocket: Received Message!");
        console.log(`WebSocket: ${event.data}`);
      };
    },
    onChangeNeoPixel() {
      this.updateServer();
    },
    onChangeWS() {
      const { websocket } = this;
      localStorage.setItem("host", JSON.stringify(websocket.host));
      localStorage.setItem("port", JSON.stringify(websocket.port));
    },
    updateServer() {
      const { websocket } = this;
      console.log("Updating server...");
      if (!websocket.handle || !websocket.opened) return;
      const bytes = new Uint8Array(this.neopixel.map(({ value }) => value));
      console.log("Sending bytes...");
      websocket.handle.send(bytes);
    },
  },
  created() {
    const { websocket } = this;
    websocket.host = JSON.parse(localStorage.getItem("host")) || "127.0.0.1";
    websocket.port = JSON.parse(localStorage.getItem("port")) || 8000;
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
