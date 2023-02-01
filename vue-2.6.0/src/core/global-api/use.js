/* @flow */

import { toArray } from '../util/index'
// 初始化 vue.use() 静态方法
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 已经安装的 plugin 集合
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 把数组中的第一个元素(plugin)去除
    const args = toArray(arguments, 1)
    // 把 vue 当作参数的第一个  arg = [vue,1,2,3]
    args.unshift(this)
    // 如果是函数
    if (typeof plugin.install === 'function') {
      // 如果是对象 调用对象的install方法
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      // 如果是函数直接调用
      plugin.apply(null, args)
    }
    // 把已安装的插件缓存起来
    installedPlugins.push(plugin)
    return this
  }
}
