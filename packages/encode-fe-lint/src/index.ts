/*
 * @Author: wangzh wangzh@didihu.com.cn
 * @Date: 2024-06-21 16:30:50
 * @LastEditors: wangzh wangzh@didihu.com.cn
 * @LastEditTime: 2024-06-21 21:48:30
 * @FilePath: \测试打包优化\encode-fe-lint\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import  initAction from './actions/init';
imort scanAction from './actions/scan';

export const init=async (options)=>{
    return await initAction({
        ...options,
        checkVersionUpdate:true
    })
}

export const scan =async (options:ScanOptions)=>{
      const checking=ora();
      checking.start(`执行${PKG_NAME} 代码检查`)；
      const report =await scanAction(options)
      let type='succeed';
      if(errorCount>0){
        type='fail'
      }else if(warningCount>0){
        type='warn'
      }
      checking[type]();
      if(result.length>0) printREport(result,false)
}