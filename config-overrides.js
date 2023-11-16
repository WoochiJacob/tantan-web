/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
const {
    override,
    addWebpackAlias,
    useBabelRc,
    removeModuleScopePlugin,
    addWebpackPlugin,
} = require('customize-cra');
const path = require('path');
const webpack = require('webpack');

module.exports = override(
    (config, env) => {
        const loaders = config.resolve;
        loaders.fallback = {
            fs: false,
            tls: false,
            net: false,
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            zlib: false,
            path: false,
            url: require.resolve('url/'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util/'),
            crypto: require.resolve('crypto-browserify'),
            os: require.resolve('os-browserify/browser'),
            buffer: require.resolve('buffer/'),
        };

        if (env === 'development') {
            config.plugins.push(
                new webpack.DefinePlugin({
                    GENERATE_SOURCEMAP: false,
                    'process.env.REACT_APP_MODE': JSON.stringify('development'),
                    'process.env.REACT_APP_API': JSON.stringify(
                        'tantan_api_dev.tantanmarketplace.com'
                    ),
                    'process.env.REACT_APP_PRIVATE_KEY': JSON.stringify(
                        '90bf3d01be60fed00bfe868f01ce59fc2e86a87dfaa69b1dd00654c7ce172a85'
                    ),
                    'process.env.REACT_APP_FEE_PRIVATE_KEY': JSON.stringify(
                        '0x34830ed6b61848203e4c2bc07204571b06657857bfdeab7efa5f13ce2636037d'
                    ),
                    'process.env.REACT_APP_SIGNATURE_KEY': JSON.stringify('denaissance1004'),
                    'process.env.REACT_APP_ETHERSCAN_KEY': JSON.stringify(
                        'XISJ52YGITBG9PPETT21398PEGYSRAWP43'
                    ),
                    'process.env.REACT_APP_RPC_URL': JSON.stringify(
                        'https://rinkeby.infura.io/v3/c19e64249f6a407e91d3a18564f6028c'
                    ),
                    'process.env.REACT_APP_KAS_ACCESS_ID': JSON.stringify(
                        'KASKYJQIBE83OPZJ8OEMFCKD'
                    ),
                    'process.env.REACT_APP_KAS_SECRET_KEY': JSON.stringify(
                        'V89qctoNutr233fSd8JB-YPf1q7cqaKqzgUHRLVi'
                    ),
                    'process.env.REACT_APP_TOSS_PAYMENTS_Client_Key': JSON.stringify(
                        'test_ck_Kma60RZblrqaDDEQzp6rwzYWBn14'
                    ),
                    'process.env.REACT_APP_TOSS_PAYMENTS_SECRET_KEY': JSON.stringify(
                        'test_sk_Z0RnYX2w532Kll1O0ElVNeyqApQE'
                    ),
                    'process.env.REACT_APP_KLAYTN_CONTRACT_ADDRESS': JSON.stringify(
                        '0x10Ce249403AD9293395aaAdb834ffC201ebeAb87'
                    ),
                    'process.env.REACT_APP_KLAYTN_SINGLE_CONTRACT_ADDRESS': JSON.stringify(
                        '0xFa5f19EDF0BD6e7f5F2957B978020AEAcAFBE03C'
                    ),
                })
            );
        }

        if (env === 'production') {
            config.plugins.push(
                new webpack.DefinePlugin({
                    'process.env.REACT_APP_MODE': JSON.stringify('production'),
                    'process.env.REACT_APP_API': JSON.stringify(
                        'tantan_api_prod.tantanmarketplace.com'
                    ),
                    'process.env.REACT_APP_PRIVATE_KEY': JSON.stringify(
                        '90bf3d01be60fed00bfe868f01ce59fc2e86a87dfaa69b1dd00654c7ce172a85'
                    ),
                    'process.env.REACT_APP_FEE_PRIVATE_KEY': JSON.stringify(
                        '0x34830ed6b61848203e4c2bc07204571b06657857bfdeab7efa5f13ce2636037d'
                    ),
                    'process.env.REACT_APP_SIGNATURE_KEY': JSON.stringify('denaissance1004'),
                    'process.env.REACT_APP_ETHERSCAN_KEY': JSON.stringify(
                        'XISJ52YGITBG9PPETT21398PEGYSRAWP43'
                    ),
                    'process.env.REACT_APP_RPC_URL': JSON.stringify(
                        'https://mainnet.infura.io/v3/c19e64249f6a407e91d3a18564f6028c'
                    ),
                    'process.env.REACT_APP_KAS_ACCESS_ID': JSON.stringify(
                        'KASKHE4OLMOBI8EI7XFMRYU8'
                    ),
                    'process.env.REACT_APP_KAS_SECRET_KEY': JSON.stringify(
                        '13STaWQ2mrnxXLITLj_h5YPeXScsvmigcezm1tXl'
                    ),
                    'process.env.REACT_APP_TOSS_PAYMENTS_Client_Key': JSON.stringify(
                        'test_ck_Kma60RZblrqaDDEQzp6rwzYWBn14'
                    ),
                    'process.env.REACT_APP_TOSS_PAYMENTS_SECRET_KEY': JSON.stringify(
                        'test_sk_Z0RnYX2w532Kll1O0ElVNeyqApQE'
                    ),
                    'process.env.REACT_APP_KLAYTN_CONTRACT_ADDRESS': JSON.stringify(
                        '0xb590360Fc035cc5c4d88Ce03f40474AA23E5658c'
                    ),
                    'process.env.REACT_APP_KLAYTN_SINGLE_CONTRACT_ADDRESS': JSON.stringify(
                        '0xdC83fac3EaBb4B996Bc8F6185f76CD39551E558a'
                    ),
                })
            );
        }

        return config;
    },
    addWebpackAlias({
        '@components': path.resolve(__dirname, 'src/components'),
        '@interfaces': path.resolve(__dirname, 'src/interfaces'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@recoil': path.resolve(__dirname, 'src/recoil'),
        '@interface': path.resolve(__dirname, 'src/interface'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@contracts': path.resolve(__dirname, 'src/contracts'),
        '@img': path.resolve(__dirname, 'public'),
        '@root': path.resolve(__dirname, '.'),
    }),
    useBabelRc(),
    removeModuleScopePlugin(),
    addWebpackPlugin(
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        })
    )
);
