<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <button @click="$refs.ruler.setValue(38.6)">设置</button>
        <div>身高</div>
        <virtual-ruler
            ref="ruler"
            style="margin-top: 20px;width: 90%;margin-left: 10px"
            top-border
            auto-resize
            :height="50"
            :min="300"
            :max="2500"
            :default-value="v2"
            :gap="10"
            :point-width="4"
            linear-gradient
            :value-gap="0.1" @change="v2 = $event">
        </virtual-ruler>
        <div>{{v2}}</div>
    </div>
</template>

<script>
import '../dist/virtual-ruler.css';
import VirtualRuler from './components';
console.log(VirtualRuler);
export default {
    name: 'App',
    components: {
        VirtualRuler
    },
    data () {
        return {
            v: 400,
            v2: 35
        };
    }
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
    body {
        margin: 0;
        padding: 0;
    }
</style>
