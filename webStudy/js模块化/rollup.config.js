module.exports = {
  input: './src/index.js',
  output: [
    {
      file: './dist/index-cjs.js',
      format: 'cjs'
    },
    {
      file: './dist/index-amd.js',
      format: 'amd'
    },
    {
      file: './dist/index-esm.js',
      format: 'es'
    },
    {
      file: './dist/index-iife.js',
      format: 'iife'
    },
    {
      file: './dist/index-umd.js',
      format: 'umd',
      name: 'res'
    }
  ]
}