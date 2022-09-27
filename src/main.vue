<template>
    <style src="croppie/croppie.css"></style>
    <p>sadsadas</p>
</template>
<script>
    import { Croppie } from 'croppie'
    import emitter from 'tiny-emitter/instance'

    $emit: (...args) => emitter.emit(...args)

    export default {
        emits: ['update', 'result'],
        props: {
            boundary: {
                type: Object,
                default: () => ({
                    width:  210,
                    height: 210,
                }),
            },

            customClass: {
                type: String,
                default: '',
            },

            enableExif: {
                type: Boolean,
                default: false,
            },

            enableOrientation: {
                type: Boolean,
                default: true,
            },

            enableResize: {
                type: Boolean,
                default: false,
            },

            enableZoom: {
                type: Boolean,
                default: true,
            },

            enforceBoundary: {
                type: Boolean,
                default: true,
            },

            mouseWheelZoom: {
                type: Boolean,
                default: true,
            },

            showZoomer: {
                type: Boolean,
                default: true,
            },

            viewport: {
                type: Object,
                default: () => ({
                    width:  200,
                    height: 200,
                    type: 'square',
                }),
            },
        },

        data: () => ({
            croppie: null,
        }),

        mounted() {
            this.init()
        },

        destroyed() {
            this.destroy()
        },

        methods: {
            bind(options) {
                return this.croppie.bind(options)
            },

            destroy() {
                if (this.croppie) {
                    this.croppie.destroy()
                }

                this.croppie = null
            },

            get(callback) {
                if (! callback) {
                    return this.croppie.get()
                }

                callback(this.croppie.get())
            },

            init() {
                const container = this.$el.querySelector('[data-croppie="container"]') || this.$el

                container.addEventListener('update', (event) => {
                    this.$emit('update', event.detail)
                })

                this.croppie = new Croppie(container, this.options)
            },

            reset() {
                this.destroy()
                this.init()
            },

            result(options, callback) {
                return this.croppie.result(Object.assign({
                    type: 'base64',
                }, options)).then((result) => {
                    if (! callback) {
                        this.$emit('result', result)

                        return result
                    }

                    callback(result)
                })
            },

            rotate(degrees) {
                this.croppie.rotate(degrees)
            },

            setZoom(value) {
                this.croppie.setZoom(value)
            },
        },

        computed: {
            options() {
                return Object.assign({}, this.$props)
            },
        },

        render(createElement) {
            let dataAttributes = {
                attrs: { 'data-croppie': 'container' },
            };
            console.log(this.$scopedSlots)
            if (this.$scopedSlots.default !== undefined) {
                dataAttributes = [
                    this.$scopedSlots.default({
                        bind: this.bind,
                        destroy: this.destroy,
                        get: this.get,
                        init: this.init,
                        reset: this.reset,
                        result: this.result,
                        rotate: this.rotate,
                        setZoom: this.setZoom,
                    })
                ]
            }

            return createElement('div', dataAttributes)
        },
    }
</script>
