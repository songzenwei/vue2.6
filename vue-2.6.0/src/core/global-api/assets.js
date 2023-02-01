/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // 遍历 ASSET_TYPES 数组，为 VUE 定义相应方法
  // ASSET_TYPES 包括了 directive，component，filter
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      // 如果没有第二个参数 
      if (!definition) {
        // 去缓存中查找对应type的内容
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        // Vue.component('comp',{template : ''})
        // 如果是 component 并且第二个参数是原始对象
        if (type === 'component' && isPlainObject(definition)) {
          // 如果组件设置了 name 就使用name 否则就使用第一个参数作为组件name属性
          definition.name = definition.name || id
          // 将第二个参数作为 extend的配置选项（返回一个 vue 的构造器,把组件配置转为组件的构造函数）
          definition = this.options._base.extend(definition)
        }
        // 如果是指令 并且第二个参数是函数
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 全局注册，存储资源并赋值
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
