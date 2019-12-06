/* eslint-disable */
import G6 from '@antv/g6/src';

export default ({ app, store }) => {
    if (process.server) {
        global.G6 = G6;
    } else {
        window.G6 = G6;
    }
}