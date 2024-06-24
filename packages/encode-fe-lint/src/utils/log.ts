/*
 * @Author: wangzh wangzh@didihu.com.cn
 * @Date: 2024-06-21 17:01:25
 * @LastEditors: wangzh wangzh@didihu.com.cn
 * @LastEditTime: 2024-06-21 17:01:47
 * @FilePath: \测试打包优化\encode-fe-lint\src\utils\log.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import chalk from 'chalk';
import { PKG_NAME, UNICODE } from './constants';

const { green, blue, yellow, red } = chalk;

export default {
  success(text: string) {
    console.log(green(text));
  },
  info(text: string) {
    console.info(blue(text));
  },
  warn(text: string) {
    console.info(yellow(text));
  },
  error(text: string) {
    console.error(red(text));
  },
  result(text: string, pass: boolean) {
    console.info(
      blue(`[${PKG_NAME}] ${text}`),
      pass ? green(UNICODE.success) : red(UNICODE.failure),
    );
  },
};
