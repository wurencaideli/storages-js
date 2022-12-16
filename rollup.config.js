/**
 * 打包配置
 */

const { terser } = require("rollup-plugin-terser");
const name = "StorageS";
const fileName = 'storages-js.js';

module.exports = {
    input: './index.js',
    output: [
        {
            file: './dist/umd/'+fileName,
            format: 'umd',
            name: name, 
            //当入口文件有export时，'umd'格式必须指定name
            //这样，在通过<script>标签引入时，才能通过name访问到export的内容。
        },
        {
            file: './dist/'+fileName,
            format: 'es',
        },
        {
            file: './dist/cjs/'+fileName,
            format: 'cjs',
        },
    ],
    plugins: [terser()],
};