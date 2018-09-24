# vue-croppie

A [Croppie](https://foliotek.github.io/Croppie/) wrapper for [Vue.js 2](https://vuejs.org/).

### Installation

```
npm install --save @idecardo/vue-croppie
```

### Usage

```html
<template>
    <div>
        <croppie ref="croppie"
                 @result="resultEventHandler"
                 @update="updateEventHandler">
        </croppie>

        <button @click="bind()">Bind</button>
        <button @click="destroy()">Destroy</button>
        <button @click="get()">Get</button>
        <button @click="init()">Init</button>
        <button @click="reset()">Reset</button>
        <button @click="resultEvent()">Result via event</button>
        <button @click="resultCallback()">Result via callback</button>
        <button @click="rotate(90)">Rotate</button>
        <button @click="setZoom(1)">Set Zoom</button>
    </div>
</template>

<script>
    import Croppie from '@idecardo/vue-croppie'

    export default {
        components: {
            Croppie,
        },
        data: () => ({
            image: 'https://i.imgur.com/ofHthFG.jpg',
            result: null,
        }),
        mounted() {
            this.$refs.croppie.bind({
                url: this.image,
            })
        },
        methods: {
            bind() {
                this.$refs.croppie.bind({
                    url: this.image,
                })
            },
            destroy() {
                this.$refs.croppie.destroy()
            },
            get() {
                this.$refs.croppie.get()
            },
            init() {
                this.$refs.croppie.init()
            },
            reset() {
                this.$refs.croppie.reset()
            },
            resultEvent() {
                this.$refs.croppie.result({
                    type: 'base64',
                })
            },
            resultCallback() {
                const options = {
                    type: 'base64',
                    format: 'jpeg',
                }

                this.$refs.croppie.result(options, (result) => {
                    this.result = result
                })
            },
            resultEventHandler(result) {
                this.result = result
            },
            rotate(degrees) {
                this.$refs.croppie.rotate(degrees)
            },
            setZoom(value) {
                this.$refs.croppie.setZoom(value)
            },
            updateEventHandler(detail) {
                console.log(detail)
            },
        },
    }
</script>
```

#### Options

All options and methods are as per the [Croppie documentation](https://foliotek.github.io/Croppie/), and can be customized using [props](https://vuejs.org/v2/guide/components-props.html#Prop-Casing-camelCase-vs-kebab-case).

```html
<croppie ref="croppie"
         :enable-orientation="false"
         :enable-zoom="false"
         :show-zoomer="false">
</croppie>
```

### Events

| Name     | Usage               | Description                           |
|----------|---------------------|---------------------------------------|
| `result` | `@result="handler"` | Triggered when a crop occurs.         |
| `update` | `@update="handler"` | Triggered when a drag or zoom occurs. |

> `result` event is not available when a callback was passed to the result method.

### Scoped Slots

You can also access methods from the component using [Scoped Slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots).

> In order for croppie to initialize, you must create an element with `data-croppie="container"` attribute anywhere within the default scoped slot.

```html
<template>
    <div id="app">
        <croppie @result="resultEventHandler" @update="updateEventHandler">
            <template slot-scope="{ bind, destroy, get, init, reset, result, rotate, setZoom }">
                <!-- Required anywhere within the default scoped slot -->
                <div data-croppie="container"></div>

                <button @click="bind(bindOptions)">Bind</button>
                <button @click="destroy()">Destroy</button>
                <button @click="get(getCallbackHandler)">Get</button>
                <button @click="init()">Init</button>
                <button @click="reset()">Reset</button>
                <button @click="result(resultOptions)">Result via event</button>
                <button @click="result(resultOptions, resultCallbackHandler)">Result via callback</button>
                <button @click="rotate(90)">Rotate</button>
                <button @click="setZoom(1)">Set Zoom</button>
            </template>
        </croppie>
    </div>
</template>

<script>
    import Croppie from '@idecardo/vue-croppie'

    export default {
        components: {
            Croppie,
        },
        data: () => ({
            image: 'https://i.imgur.com/ofHthFG.jpg',
            result: null,
        }),
        methods: {
            getCallbackHandler(croppie) {
                console.log(croppie)
            },
            resultCallbackHandler(result) {
                this.result = result
            },
            resultEventHandler(result) {
                this.result = result
            },
            updateEventHandler(detail) {
                console.log(detail)
            },
        },
        computed: {
            bindOptions() {
                return {
                    url: this.image,
                }
            },
            resultOptions() {
                return {
                    type: 'base64',
                    format: 'jpeg',
                }
            },
        },
    }
</script>
```
