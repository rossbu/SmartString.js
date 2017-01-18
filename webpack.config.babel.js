import { join } from 'path'

const include = join(__dirname, 'lib')

export default {
    entry: './lib/SmartString',
    output: {
        path: join(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'SmartString',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', include },
            { test: /\.json$/, 'loader': 'json', include },
        ]
    }
}