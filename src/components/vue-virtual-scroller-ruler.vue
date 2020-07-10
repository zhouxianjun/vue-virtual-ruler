<template>
    <div class="scroller-ruler">
        <component
            ref="scroller"
            :is="typeComponent"
            v-bind="bindOptions"
            v-slot="{ index, item }"
            class="wrapper"
            :style="style">
            <vue-render-slot v-for="(_, key) in slots" :key="key" :slot="key" :slot-name="key"/>
            <div class="ruler" :data-id="item._realIndex">
                <div class="ruler-wrapper" :style="{height: itemDIVHeight}">
                    <div :style="getItemStyle(item._realIndex)"/>
                </div>
                <div v-if="labelShow(item._realIndex)" class="ruler-label">
                    <slot name="label" :value="realValue">
                        {{item.value * valueGap}}
                    </slot>
                </div>
            </div>
        </component>
        <div class="ruler-point" :style="_pointStyle"/>
    </div>
</template>

<script>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import RecycleScroller from 'vue-virtual-scroller/src/components/RecycleScroller';
import DynamicScroller from 'vue-virtual-scroller/src/components/DynamicScroller';
import VueRenderSlot from 'vue-render-slot';
import pickBy from 'lodash.pickby';
const TYPES = [RecycleScroller, DynamicScroller];
export default {
    name: 'VueVirtualScrollerRuler',
    props: {
        defaultValue: Number,
        type: {
            type: String,
            default: 'RecycleScroller'
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        options: Object,
        itemGap: {
            type: Number,
            default: 8
        },
        itemWidth: {
            type: [Number, String],
            default: 1
        },
        itemColor: {
            type: String,
            default: '#cccccc'
        },
        itemHeight: {
            type: Function,
            default: (index) => {
                if (index % 10 === 0) {
                    return 25;
                }
                if (index % 5 === 0) {
                    return 20;
                }
                return 15;
            }
        },
        itemMaxHeight: {
            type: [Number, String],
            default () {
                const all = Array.from({ length: this.max + 1 - this.min }).map((_, index) => this.itemHeight(index));
                return Math.max(...all);
            }
        },
        labelGap: {
            type: Number,
            default: 10
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        pointWidth: {
            type: [Number, String],
            default: 1
        },
        pointColor: {
            type: String,
            default: '#00C5CD'
        },
        pointStyle: Object,
        height: {
            type: [Number, String],
            required: true
        },
        topBorder: {
            type: Boolean,
            default: false
        },
        topBorderWidth: {
            type: [Number, String],
            default: 1
        },
        topBorderColor: {
            type: String,
            default: '#cccccc'
        },
        valueGap: {
            type: Number,
            default: 1
        }
    },
    components: {VueRenderSlot},
    data () {
        return {
            halfCount: 1,
            scrollerEndTimer: null,
            val: this.defaultValue || this.min
        };
    },
    computed: {
        typeComponent () {
            const com = TYPES.find(item => item.name === this.type);
            return com || TYPES[0];
        },
        list () {
            return Array.from({ length: this.max + 1 - this.min }).map((_, index) => ({value: index + this.min}));
        },
        halfWidth () {
            return document.body.clientWidth / 2;
        },
        rulerList () {
            return [ {}, ...this.list, {}].map((item, index) => ({
                _index: index,
                ...item,
                _realIndex: this.getRealIndex(index),
                size: index === 0 || index === this.list.length ? this.halfWidth : this.itemGap
            }));
        },
        slots () {
            return pickBy(this.$scopedSlots, (_, key) => String(key) !== 'default');
        },
        bindOptions () {
            return {
                direction: 'horizontal',
                keyField: '_index',
                ...this.options,
                buffer: 500,
                itemSize: null,
                items: this.rulerList
            };
        },
        itemDIVHeight () {
            return this.getPx(this.itemMaxHeight);
        },
        _itemWidth () {
            const { itemWidth } = this;
            return this.getPx(itemWidth);
        },
        _pointStyle () {
            const width = this.getPx(this.pointWidth);
            return {
                borderRight: `${width} solid ${this.pointColor}`,
                height: this.itemDIVHeight,
                ...(this.pointStyle || {})
            };
        },
        style () {
            return {
                height: this.getPx(this.height),
                borderTop: this.topBorder ? `${this.getPx(this.topBorderWidth)} solid ${this.topBorderColor}` : 'none'
            };
        },
        realValue () {
            return this.val * this.valueGap;
        }
    },
    watch: {
        value () {
            // this.$nextTick(() => this.setValue(value));
        },
        val (value) {
            this.$emit('input', value);
        }
    },
    mounted () {
        this.$refs.scroller.$el.addEventListener('scroll', this.scrollerHandler.bind(this));
        setTimeout(() => this.setValue(this.value));
    },
    methods: {
        getPx(value, unit = 'px') {
            return typeof value === 'number' ? `${value}${unit}` : value;
        },
        getRealIndex (index) {
            if (index < this.halfCount || index > this.list.length + this.halfCount - 1) {
                return -index - 1;
            }
            return index - this.halfCount;
        },
        labelShow (index) {
            return this.showLabel && index >= 0 && index % this.labelGap === 0;
        },
        getItemStyle (index) {
            if (index < 0) {
                return {};
            }
            const { itemColor, itemHeight } = this;
            const height = this.getPx(itemHeight(index));
            return {
                borderLeft: `${this._itemWidth} solid ${itemColor}`,
                height
            };
        },
        scrollerHandler (event) {
            clearTimeout(this.scrollerEndTimer);
            const x = event.target.scrollLeft;
            const value = Math.round(x / this.itemGap + this.min);
            this.val = Math.min(value, this.max);
            this.scrollerEndTimer = setTimeout(() => this.scrollerEnd(event), 500);
        },
        scrollerEnd () {
            this.setValue(this.val);
        },
        setValue (val) {
            const index = this.rulerList.find(item => item.value === val)?._realIndex;
            this.$refs.scroller.$el.scrollLeft = index * this.itemGap;
        }
    }
};
</script>

<style>
    .wrapper {
    }
    .wrapper::-webkit-scrollbar {
        display: none;
    }
    .ruler {
        position: relative;
    }
    .ruler-wrapper {
    }
    .ruler-label {
        position: absolute;
        text-align: center;
        width: 50px;
        left: -25px;
        color: #cccccc;
        font-size: 15px;
    }
    .ruler-point {
        position: absolute;
        left: 50%;
        top: 0;
    }
    .scroller-ruler {
        position: relative;
    }
</style>
