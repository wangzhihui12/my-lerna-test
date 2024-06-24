/*
 * @Author: wangzh wangzh@didihu.com.cn
 * @Date: 2024-06-21 16:32:33
 * @LastEditors: wangzh wangzh@didihu.com.cn
 * @LastEditTime: 2024-06-21 17:11:32
 * @FilePath: \测试打包优化\encode-fe-lint\src\actions\update.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import npmType from '../utils/npm-type'
//子进程的同步执行
import { execSync } from 'child_process';
import ora from 'ora';
import log from '../utils/log'
import {PKG_NAME,PKG_VERSION } from '../utils/constants';

const checkVersionUpdate=async():Promise<string|null>=>{
     const npm =await  npmType;
     const latestVersion=execSync(`${npm} view ${PKG_NAME}`).toString('utf-8').trim()
     if(latestVersion===PKG_VERSION){
         return null
     }

     const compareArr=PKG_VERSION.split('.').map(Number);
     const beComparedARR=latestVersion.split('.').map(Number);

     for(let i=0,i<compareArr.length;i++){
        if(compareArr[i]>beComparedARR[i]){
            return null
        }else if(compareArr[i]<beComparedARR[i]){
            return latestVersion
        }
     }
   

}

export default async (install=true)=>{
    const checking=ora(`[${PKG_NAME}] 正在检查最新版本...`)
    checking.start()

    try{
        const npm =await npmType;
        const latestVersion =await checkLatestVersion();
        checking.stop();
        if(latestVersion&&install){
           const update=ora(`[${PKG_NAME}] 检测到新版本,将升级至${latestVersion}`)
           update.start() 
           execSync(`${npm} install ${PKG_NAME}@${latestVersion} -g`))
           update.stop()
        }else if(latestVersion){
            log.warn(`[${PKG_NAME}] 当前版本为最新版本${latestVersion}`)
        }else if(install){
            log.infi('当前没有可用的更新')
        }
    }catch(e){
        checking.stop()
        log.error(e)
    }
}