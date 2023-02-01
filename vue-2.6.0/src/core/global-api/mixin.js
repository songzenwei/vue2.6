/* @flow */

import { mergeOptions } from '../util/index'

//初始化 vue.mixin() 静态方法
export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    // 将传入的option 合并到全局的 vue.option 中 （注册的是全局的选项）
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
