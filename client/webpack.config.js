const dotenv = require('dotenv');
const webpack = require('webpack');

dotenv.config();

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    ]
};
