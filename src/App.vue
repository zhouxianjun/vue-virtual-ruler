<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <button @click="$refs.ruler.setValue(380)">设置</button>
        <div>身高</div>
        <virtual-ruler
            ref="ruler"
            style="margin-top: 20px;width: 80%;margin-left: 50px"
            top-border
            :height="50"
            :min="300"
            :max="2500"
            :default-value="v2"
            :gap="10"
            :value-gap="0.1" @change="v2 = $event">
        </virtual-ruler>
        <div>aaaa</div>
    </div>
</template>

<script>
import VirtualRuler from '../dist/virtual-ruler.umd.min';
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
