<template>
    <section class="mypdf-container">
        <div class="btns" v-if="!fullPage">
            <div>
                <span>共{{pageTotal}}页</span>
                <el-button size="mini" class="icon-link" icon="el-icon-arrow-left" :disabled="pageNum==1" @click="handlePrev">上页</el-button>
                <input type="text" v-model="pageNum" @keyup.enter="getPdfPage" />
                <el-button size="mini" class="icon-link" icon="el-icon-arrow-right" :disabled="pageNum==pageTotal" @click="handleNext">下页</el-button>
            </div>
            <div>
                <!-- <el-button size="mini" class="icon-link" :icon="fitWidth=='auto'?'my-icon-compress':'my-icon-expand'" @click="handleFit">还原</el-button>
                <el-button size="mini" class="icon-link" icon="el-icon-zoom-out" @click="handleMinus">缩小</el-button>
                <el-button size="mini" class="icon-link" icon="el-icon-zoom-in" @click="handleAddscale">放大</el-button> -->
                <el-button size="mini" class="icon-link" icon="el-icon-close" @click="$emit('close')">关闭</el-button>
            </div>
        </div>
        <div id="canvas-container" class="canvas-container" v-loading="isLoading" element-loading-text="加载中,清稍后...">
            <!-- <el-scrollbar class="scrollbar"> -->
            <div id="mypdfcanvas" class="mypdfcanvas" ref="mypdfcanvas"></div>
            <!-- </el-scrollbar> -->
        </div>
    </section>
</template>

<script>
import pdfjsLib from "pdfjs-dist";


export default {
    name: 'pdf-view',
    props: {
        visible: Boolean,
        type: "",
        pdfUrl: {
            type: String,
            default: ""
        },
        fullPage: {
            type: Boolean,
            default: true
        },

    },
    watch: {
        visible(val) {
            if (val) {
                this.$nextTick(() => {
                    if (this.type == "stream") { // 文件流方式
                        this.parseStream();
                    } else {
                        this.padData = val;
                        this.reload();
                    }
                })
            }
        },
    },
    data: () => ({
        pdfDoc: {},
        pageNum: 1,
        pageTotal: 0,
        scale: 1,
        maxScale: 3,
        minScale: 0,
        initFlag: true,
        scrollX: true,
        freeScroll: true,
        isLoading: false,
        pdf: null,
        pdfContainer: null,
        fitWidth: 'auto',
        pdfData: "",
    }),

    methods: {
        convertDataURIToBinary(dataURI) {
            dataURI = dataURI.replace(/[\n\r]/g, '');
            var raw = window.atob(dataURI);//这个方法在ie内核下无法正常解析。
            var rawLength = raw.length;
            //转换成pdf.js能直接解析的Uint8Array类型
            var array = new Uint8Array(new ArrayBuffer(rawLength));
            for (let i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i) & 0xff;
            }
            return array;
        },
        parseStream() {
            this.padData = this.convertDataURIToBinary(this.pdfUrl);
            this.reload();
        },
		/*
		*   删除canvas
		* */
        deleteCanvas() {
            document.querySelector('#mypdfcanvas').innerHTML = "";
        },
        reload() {
            this.deleteCanvas();
            this.pageNum = 1;
            this.isLoading = true;
            this.handleInitPdf();
        },
		/*
		*   初始化PDF
		* */
        handleInitPdf() {
            this.pdfContainer = document.getElementById('mypdfcanvas');
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/lib/pdf.worker.min.js';
            if (!this.padData) return;
            let loadingTask = pdfjsLib.getDocument(this.padData);
            loadingTask.promise.then((pdf) => {
                this.pageTotal = pdf.numPages;
                this.pdf = pdf;
                this.getPdfPage();
            }, (reason) => {
                this.$alert(reason);
            });
        },

        floor(value, precision) {
            const multiplier = Math.pow(10, precision || 0);
            return Math.floor(value * multiplier) / multiplier;
        },

        getPdfPage() {
            if (!this.pdf) {
                return;
            }
            if (isNaN(this.pageNum)) {
                this.$alert('请输入整数！', '错误');
                return;
            }
            this.pageNum = typeof this.pageNum == "string" ? parseInt(this.pageNum) : this.pageNum;
            this.pageNum = this.pageNum < 0 ? 1 : this.pageNum;

            this.pdf.getPage(this.pageNum).then((page) => {
                console.log('this.scale', this.scale);
                if (this.initFlag) {
                    let scale = this.floor(this.scale, 2);
                    console.log('page.view', page.view)
                    this.scale = document.getElementById("canvas-container").getBoundingClientRect().width / page.view[2];
                    this.minScale = scale; //scale;
                }
                this.initFlag = false;
                let canvas = document.createElement("canvas");
                canvas.setAttribute("id", 'pdfCanvas');
                if (!this.fullPage) {
                    this.pdfContainer.innerHTML = "";
                }
                this.pdfContainer.appendChild(canvas);

                let viewport = page.getViewport({ scale: this.scale });
                let context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var renderContext = {
                    "canvasContext": context,
                    "viewport": viewport
                };
                let renderTask = page.render(renderContext);

                if (!this.fullPage) { // 非全部页面
                    renderTask.promise.then(() => {
                        this.isLoading = false;
                    });

                } else {
                    renderTask.promise.then(() => {
                        this.pageNum += 1;
                        if (this.pageNum <= this.pageTotal) {
                            this.getPdfPage();
                        } else {
                            this.isLoading = false;
                        }
                    })
                }
            })
        },
        pageWidthScale() {
            const { defaultViewport, $el } = this;
            if (!defaultViewport.width) return 0;

            return ($el.clientWidth * PIXEL_RATIO) * VIEWPORT_RATIO / defaultViewport.width;
        },


        // 宽度适应；待完善
        handleFit() {
            this.fitWidth = this.fitWidth === 'auto' ? 'width' : 'auto';
            this.scale = 1;
            this.isLoading = true;
            this.getPdfPage();
        },
		/*
		*   放大
		* */
        handleAddscale() {
            if (this.scale >= this.maxScale) {
                return
            }
            this.scale += 0.2;
            this.isLoading = true;
            this.getPdfPage();
        },
		/*
		*   缩小
		* */
        handleMinus() {
            if (this.scale <= this.minScale) {
                return
            }
            this.scale -= 0.2;
            this.isLoading = true;
            this.getPdfPage();
        },
		/*
		*   上一页
		* */
        handlePrev() {
            let vm = this
            if (this.pageNum <= 1) {
                return;
            }
            this.pageNum--;
            this.isLoading = true;
            this.getPdfPage();
        },
		/*
		*   下一页
		* */
        handleNext() {
            //let vm = this
            if (this.pageNum >= this.pageTotal) {
                return;
            }
            this.pageNum++;
            this.isLoading = true;
            this.getPdfPage();
        },
		/*
		*   重新渲染
		* */
        handleQueueRenderPage(num) {
            this.handleInitPdf(num);
        }
    },
    mounted() {
        window.onresize = _.debounce(() => {
            //this.initFlag = true;
            this.isLoading = true;
            this.getPdfPage();
        }, 200)
    }
}
</script>

<style lang="scss" scoped>
.mypdf-container {
    height: calc(100% - 2px);
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    .btns {
        height: 30px;
        background-color: #eee;
        display: flex;
        box-sizing: border-box;
        padding: 0 10px;
        align-items: center;
        justify-content: space-between;
        > div {
            font-size: 12px;
            display: flex;
            align-items: center;
            button {
                &.is-disabled {
                    background-color: transparent;
                }
            }
            input {
                width: 30px;
                text-align: center;
                border: 1px solid rgba(0, 0, 0, 0.2);
                line-height: 14px;
                margin: 0 10px;
                border-radius: 2px;
            }
        }
    }
    .canvas-container {
        width: 100%;
        // min-width: 750px;
        flex: 1;
        overflow: auto;
        background-color: #fff;
        .mypdfcanvas {
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 500px;
        }
        .scrollbar {
            height: 100%;
            width: 100%;
            /deep/ .el-scrollbar__wrap {
                overflow-x: hidden;
            }

            /deep/ .is-horizontal {
                display: none;
            }
        }
    }
}
</style>
