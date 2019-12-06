<template>
    <section class="setup-container">
        <div class="header">
            <ToolbarPanel ref="toolbar" v-if="!isView" />
        </div>
        <div class="content">

        </div>
    </section>
</template>

<script>
import G6 from '@antv/g6/src';
import { getShapeName } from './util/clazz';
import Command from './util/command';
import Toolbar from './util/toolbar'
import AddItemPanel from './util/addItemPanel'
import CanvasPanel from './util/canvasPanel'
import ToolbarPanel from '~/components/workflow/ToolbarPanel'
import ItemPanel from '~/components/workflow/ItemPanel'
import DetailPanel from '~/components/workflow/DetailPanel'

import registerShape from './shape'
import registerBehavior from './behavior'

registerShape(G6);
registerBehavior(G6);

export default {
    components: {
        ToolbarPanel
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },
    data: () => ({
        isView: false
    }),
    methods: {

    },
    mounted() {
    },

    layout: "admin"
}
</script>
<style lang="scss" scoped>
@import './setup';
</style>