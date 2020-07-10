# vue virtual ruler

vue2 高性能刻度尺组件
![image](https://github.com/zhouxianjun/vue-virtual-ruler/raw/master/src/assets/%E5%B1%8F%E5%B9%95%E5%BD%95%E5%88%B62020-07-10%20%E4%B8%8B%E5%8D%886.gif)

### Installation

```
npm install virtual-ruler --save
```

```
import VirtualRuler from 'virtual-ruler'

export default {
    name: 'example',
    components: {
        VirtualRuler
    },
    data () {
        return {
            v2: 35
        }
    }
}

<virtual-ruler
    ref="ruler"
    top-border
    :height="50"
    :min="300"
    :max="2500"
    :default-value="v2"
    :gap="10"
    :value-gap="0.1" @change="v2 = $event">
</virtual-ruler>
```

## API

### Table Attributes

| 属性          | 说明                                          | 类型  |   必选    | 默认值     |
| ------------- | --------------------------------------------- | -------- | ---- | ---------- |
| default-value  | 默认值                                | Number   |   false  | min         |
| min       | 最小刻度值                                 | Number   |    false   | 0         |
| max       | 最大刻度值                                 | Number   |    false  | 100         |
| gap       | 刻度线间隔                                 | Number   |    true  | 100         |
| item-width       | 刻度线宽度                                 | Number\|String   |    true  | 100         |
| item-color       | 刻度线颜色                                | String   |    false  | \#cccccc         |
| item-height       | 刻度线高度计算函数                                | Function(index)   |    false  | 8、5、20         |
| item-max-height    | 刻度线最高高度                                | Number\|String   |    false  | Math.max(item-height)        |
| point-width    | 刻度标线宽度                                | Number\|String   |    false  | 1        |
| point-color    | 刻度标线宽度                                | String   |    false  | \#00C5CD        |
| point-style    | 刻度标线自定义样式                                | Object   |    false  | -        |
| label-gap    | 刻度值label间隔                                | Number   |    false  | 10        |
| show-label    | 是否显示刻度值label                                | Boolean   |    false  | true        |
| value-gap    | 刻度值的倍数，例如刻度值为 100，倍数为0.1则值为100 * 0.1 | Number   |    false  | 1        |
| buffer    | 缓冲数量，预先渲染                                | Number   |    false  | 10        |
| height    | 刻度尺高度                                | Number\|String   |    true  | -        |
| top-border    | 刻度尺上边框                                | Boolean   |    false  | false       |
| top-border-width    | 刻度尺上边框宽度                                | Number\|String   |    false  | 1       |
| top-border-color    | 刻度尺上边框颜色                              | String   |    false  | \#cccccc      |
| linear-gradient    | 刻度尺背景渐变                              | Boolean   |    false  | false      |
| linear-gradient-direction-var    | 刻度尺背景渐变方向                              | Array   |    false  | ['ro', 'right']      |
| linear-gradient-color-var    | 刻度尺背景渐变颜色                              | Array   |    false  | ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0) 25%', 'rgba(255, 255, 255, 0) 85%', 'rgba(255, 255, 255, 1) 100%']      |


### slots

| 属性      | 说明                                                            | 参数 |
| --------- | --------------------------------------------------------------- | -------- | ------ |
| label     | 刻度值插槽                                                      |   value、index   |

### Events

| 事件名           | 说明                   | 参数                 |
| ---------------- | ---------------------- | -------------------- |
| change  | 滑动实时触发       | 当前刻度值 |

### Table Methods

| 方法名          | 说明             | 参数                                      |
| --------------- | ---------------- | ----------------------------------------- |
| setValue | 设置当前刻度值 | 刻度值 |
